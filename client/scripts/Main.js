import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Raven from 'raven-js';

import DrawerComponent from './Components/drawer/drawer.component';
import SnackbarComponent from './Components/snackbar/snackbar.component';
import ModalComponent from './Components/modal/modal.component';
import { ENDPOINT } from '../../config/constants';

import Snackbar from '@material-ui/core/Snackbar';
import LandingContainer from './Containers/landing/landing.container';
import HashLoader from 'react-spinners/HashLoader';
import { css } from '@emotion/core';
import ReactGA from 'react-ga';

import '../styles/main.scss';

const INITIALSTATE = {
  loggedIn: false,
  profile: {},
  channels: {
    list: [],
    cursor: '',
  },
  token: '',
  isAdmin: false,
  user_id: '',
  loading: true,
  error: {
    present: false,
    message: '',
  },
  notificationInfo: {
    message: '',
    variant: 'success',
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  },
  modalOpen: false,
  loadingApp: true,
};

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    width: 300px;
    height: 100px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -70px 0 0 -170px;
`;

export default class Main extends Component {
  state = INITIALSTATE;


  componentDidMount = async () => {
    this.initializeReactGA();
    ReactGA.pageview(window.location.pathname + window.location.search);

    await this.getUserAuth();
    await this.getChannels(this.state.token);
    await this.getPrivateGroups(this.state.token);

    setTimeout(() => {
      this.setState({
        loadingApp: false,
      });
    }, 300);
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
    Raven.showReportDialog();
  }

  getUserAuth = async () => {
    try {
      const res = await axios.get('/api/profile');

      if (res.data.ok) {
        this.setState({
          profile: res.data.user.profile,
          loggedIn: true,
          loading: false,
          token: res.data.token,
          user_id: res.data.user_id,
          isAdmin: res.data.user.is_admin,
        });
      } else {
        this.setState({
          profile: {},
          loggedIn: false,
          loading: false,
        });
      }
    } catch (err) {
      this.setState(
        {
          profile: {},
          loggedIn: false,
          loading: false,
        },
        () => {
          this.updateError(
            // I know...
            // eslint-disable-next-line
            'Something\'s wrong. Try again later',
            'getUserAuth catch block',
          );
        },
      );
    }
  };

  getChannels = async (token) => {
    if (token.length) {
      const res = await axios.get(`${ENDPOINT}channels.list`, {
        params: {
          token: this.state.token,
          exclude_members: true,
          exclude_archived: true,
          limit: 200,
        },
      });
      const newChannels = this.state.channels.list.concat(res.data.channels);
      this.setState({
        channels: {
          list: newChannels,
          cursor: res.data.response_metadata.next_cursor,
        },
      });
    }
  };

  onCloseNotification = () => {

    this.setState(
      {
        notificationInfo: {
          ...this.state.notificationInfo,
          open: false,
        },
      });
  };

  getPrivateGroups = async (token) => {
    if (token.length) {
      const res = await axios.get(`${ENDPOINT}groups.list`, {
        params: {
          token: this.state.token,
          exclude_members: true,
          exclude_archived: true,
        },
      });

      if (res.data.ok) {
        const newGroups = this.state.channels.list.concat(res.data.groups);

        this.setState({
          channels: {
            list: newGroups,
          },
        });
      }
    }
  };

  sendNotification = (data) => {

    this.setState(
      {
        notificationInfo: {
          ...this.state.notificationInfo,
          ...data,
          open: true,
        },
      });

    setTimeout(() => {
      this.setState(
        {
          notificationInfo: {
            ...this.state.notificationInfo,
            open: false,
          },
        });
    }, 8000);
  };

  updateError = (message = '', errorTrack = '') => {
    if (!message.length) {
      this.setState({ error: INITIALSTATE.error });
    }

    this.setState(
      {
        error: {
          present: true,
          message,
        },
      },
      () => {
        setTimeout(() => {
          this.setState({ error: INITIALSTATE.error });
        }, 5000);
      },
    );

    Raven.captureMessage(errorTrack);
  };

  openModal = () => {

    this.setState({
      modalOpen: true,
    });
  };

  closeModal = () => {

    this.setState({
      modalOpen: false,
    });
  };

  initializeReactGA = () => {
    ReactGA.initialize('UA-154138019-1');
  };

  renderLandingPage = () => {

    return (!this.state.loggedIn) ? (<LandingContainer openModal={this.openModal}/>) :
      (<Fragment>

        {/*Snackbar - main component for notifications*/}
        <Snackbar
          anchorOrigin={{
            vertical: this.state.notificationInfo.vertical,
            horizontal: this.state.notificationInfo.horizontal,
          }}
          open={this.state.notificationInfo.open}
        >
          <SnackbarComponent
            variant={this.state.notificationInfo.variant}
            message={this.state.notificationInfo.message}
            onClose={this.onCloseNotification}
          />
        </Snackbar>
        {/*end of Snackbar*/}

        {/*Drawer - main component*/}
        <DrawerComponent
          isLoggedIn={this.state.loggedIn}
          name={this.state.profile.first_name}
          isAdmin={this.state.isAdmin}
          avatar={this.state.profile.image_192 || this.state.profile.image_72}
          loading={this.state.loading}
          teamName={this.state.profile.teamName}
          userId={this.state.user_id}
          accessToken={this.state.token}
          channels={this.state.channels.list}
          updateError={this.updateError}
          sendNotification={this.sendNotification}
          openModal={this.openModal}
        />
        {/*end of Drawer*/}

      </Fragment>);
  };

  render() {
    return (
      <Fragment>

        {/*Modal*/}
        <ModalComponent open={this.state.modalOpen} onClose={this.closeModal}/>
        {/*end of Modal*/}

        {this.state.loadingApp ? (
          <HashLoader
            css={override}
            sizeUnit={'px'}
            size={300}
            color={'#3f51b5'}
            loading={this.state.loadingApp}
          />
        ) : this.renderLandingPage()}
      </Fragment>
    );
  }
}
