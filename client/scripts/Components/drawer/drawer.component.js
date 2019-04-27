import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import throttle from 'lodash.throttle';
import axios from 'axios';
import moment from 'moment';

import AppBarComponent from '../app-bar/app-bar.component';
import FilterComponent from '../filter/filter.component';
import GridComponent from '../grid/grid.component';
import { ENDPOINT } from '../../../../config/constants';

// begin of material UI //
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { formatBytes, sortFiles } from '../../utils';
// end of material UI //

import '../../../styles/main.scss';

const drawerWidthOpen = open ? 345 : 0;
const drawerWidth = (window.innerWidth < 800) ? window.innerWidth : drawerWidthOpen;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: open ? 1 : 0,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow: {
    width: '100%',
  },
});

const INITIAL_STATE = {
  files: [],
  deletedSize: 0,
  paging: {
    total: 0,
    page: 1,
    pages: 1,
  },
  currentPage: 1,
  rate_time: 0,
  rate_count: 0,
  hasRun: false,
  hasFiles: false,
  searchDetails: {
    from: null,
    to: null,
    types: null,
    channel: null,
  },
  size: '',
  date: 'newest',
  startDate: null,
  endDate: null,
  getFilesFirstTime: true,
  sortByDateValues: [
    { id: 'newest', name: 'Newest' },
    { id: 'oldest', name: 'Oldest' },
  ],
  sortBySizeValues: [
    { id: 'largest', name: 'Largest' },
    { id: 'smallest', name: 'Smallest' },
  ],
  sortByDateValue: 'newest',
  sortBySizeValue: '',
};

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
    ...INITIAL_STATE,
  };

  componentDidMount = () => {
    this.getFiles();
  };

  componentWillUnmount() {
    clearInterval(this.myTimer);
  }

  onSizeChange = (e) => {
    this.setState({
      size: e.target.value,
    });
  };

  onDateChange = (data) => {
    this.setState({
      startDate: data.startDate,
      endDate: data.endDate,
    });
  };

  getFiles = (from = null, to = null, types = null, channel = null) => {
    const now = moment()
      .seconds(0)
      .milliseconds(0)
      .minutes(0);
    let fromValue, toValue;
    if (from) {
      fromValue = from ? moment(from).unix() : null;
    }

    if (to) {
      toValue = !moment(now).isSame(to) ? moment(to).unix() : null;
    }

    this.setState(
      {
        searchDetails: {
          from: fromValue,
          to: toValue,
          types,
          channel,
        },
      },
      () => {
        this.callGetFiles();
      },
    );
  };

  startTimer = () => {
    if (this.state.rate_count >= 25 && this.state.rate_time) {
      this.props.updateError(
        'Slow down that trigger finger, Slack has a rate limit of 50 calls every minute.',
      );
      return false;
    }

    if (!this.state.rate_time) {
      this.myTimer = setTimeout(this.timer.bind(this), 15000);
      this.setState({ rate_time: true, rate_count: 1 });
    }

    return true;
  };

  timer = () => {
    this.setState({ rate_time: false, rate_count: 0 });
  };

  // ### TODO Refactor the shit out of this
  callGetFiles = throttle(async () => {
    if (await !this.startTimer()) {
      return;
    }

    try {
      const res = await axios.get(`${ENDPOINT}files.list`, {
        params: {
          token: this.props.accessToken,
          user: !this.props.isAdmin ? this.props.userId : null,
          ts_from: this.state.searchDetails.from,
          ts_to: this.state.searchDetails.to,
          page: this.state.currentPage,
          types: this.state.searchDetails.types
            ? this.state.searchDetails.types
            : null,
          channel: this.state.searchDetails.channel
            ? this.state.searchDetails.channel
            : null,
        },
      });

      if (!res.data.ok) {
        this.props.updateError('Slack says no :(', 'GetFiles returned not ok');
        return;
      }

      // If results are completely empty, reset the page count
      if (!res.data.files.length) {
        this.setState({
          files: [],
          hasFiles: false,
          hasRun: true,
          currentPage: 1,
          rate_count: this.state.rate_count + 1,
        });
        return;
      }

      this.setState({
        files: res.data.files,
        hasFiles: res.data.files.length > 0,
        hasRun: true,
        paging: res.data.paging,
        rate_count: this.state.rate_count + 1,
      });
    } catch (err) {
      this.props.updateError(
        'Slack looks like it is down :(',
        `getFiles - ${err}`,
      );
      this.setState({
        files: [],
        paging: INITIAL_STATE.paging,
        rate_count: this.state.rate_count + 1,
      });
    }
  }, 100);

  handlePageUpdate = (pageNumber) => {
    this.setState({ currentPage: pageNumber }, () => {
      this.callGetFiles();
    });
  };

  callDeleteFile = throttle(async (fileId) => {
    if (!this.startTimer()) {
      return;
    }

    try {
      const res = await axios.get(`${ENDPOINT}files.delete`, {
        params: {
          token: this.props.accessToken,
          file: fileId,
        },
      });
      this.setState({ rate_count: this.state.rate_count + 1 });

      if (!res.data.ok) {
        const message = `Slack said no :(. Try it again. File with id: ${fileId} cannot be deleted now.`;
        this.onSendNotification(message, 'warning');
      } else {
        this.deleteFile(fileId);
      }
    } catch (err) {
      const message = `You must be logged in! - ${err}`;
      this.onSendNotification(message, 'error');
    }
  }, 1000);

  deleteFile = (fileId) => {

    const file = this.state.files.filter((item) => item.id === fileId)[0];
    const filteredFiles = this.state.files.filter((item) => item.id !== fileId);
    const fileSize = file.size + this.state.deletedSize;

    if (!filteredFiles.length) {
      this.setState({
        files: [],
        error: INITIAL_STATE.error,
        deletedSize: fileSize,
      });
      return;
    }

    this.setState({
      files: filteredFiles,
      error: INITIAL_STATE.error,
      deletedSize: fileSize,
    });

    this.onSendNotification(`Deleted file with id: ${fileId}, you just saved ${formatBytes(fileSize)}`, 'success');
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onSendNotification = (message, variant) => {
    this.props.sendNotification({ message, variant });
  };

  handleModal = (shouldOpen) => {
    this.props.openModal(shouldOpen);
  };

  onSortByDateValueChange = (value) => {
    this.setState({ sortByDateValue: value });
  };

  onSortBySizeValueChange = (value) => {
    this.setState({ sortBySizeValue: value });
  };

  Logout = (e) => {
    e.preventDefault();
    window.location.replace('api/logout');
  };

  render() {
    const {
      classes,
      theme,
      isLoggedIn = false,
      name = '',
      avatar = '',
      isAdmin = false,
      accessToken,
      channels,
      userId,
      updateError = () => {
      },
    } = this.props;

    const { open, getFilesFirstTime } = this.state;

    const files = sortFiles(this.state.files, this.state.sortBySizeValue, this.state.sortByDateValue);

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBarComponent
          open={open}
          isLoggedIn={isLoggedIn}
          name={name}
          isAdmin={isAdmin}
          avatar={avatar}
          onChange={isLoggedIn ? this.handleDrawerOpen : null}
          onLogout={isLoggedIn ? this.Logout : null}
          openModal={this.handleModal}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography variant="h5" color="inherit" className={classes.grow}>
              Search for Files
            </Typography>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
            </IconButton>
          </div>
          <Divider/>

          <FilterComponent
            isLoggedIn={isLoggedIn}
            channels={channels}
            date={this.state.date}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            sortByDateValues={this.state.sortByDateValues}
            sortBySizeValues={this.state.sortBySizeValues}
            sortByDateValue={this.state.sortByDateValue}
            sortBySizeValue={this.state.sortBySizeValue}
            onSortBySizeValueChange={this.onSortBySizeValueChange}
            onSortByDateValueChange={this.onSortByDateValueChange}
            onGetFiles={this.getFiles}
            onDateChange={this.onDateChange}
            updateError={updateError}
          />

        </Drawer>
        <main className={classNames(classes.content, { [classes.contentShift]: open })}>
          <div className={classes.drawerHeader}/>

          <GridComponent
            isLoggedIn={this.props.isLoggedIn}
            hasFiles={this.state.hasFiles}
            teamName={this.props.teamName}
            paging={this.state.paging}
            files={files}
            open={this.state.open}
            size={this.state.size}
            daate={this.state.date}
            onDeleteFile={this.callDeleteFile}
            handlePageUpdate={this.handlePageUpdate}
            updateError={updateError}
          />

        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.string,
  isAdmin: PropTypes.bool,
  accessToken: PropTypes.string,
  channels: PropTypes.array,
  userId: PropTypes.string,
  teamName: PropTypes.string,
  getFilesFirstTime: PropTypes.bool,
  updateError: PropTypes.func,
  sendNotification: PropTypes.func,
  openModal: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
