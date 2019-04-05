import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import FAQ from '../FAQ';
import { formatBytes } from '../../utils';
import Button from '../Button';
import Count from '../Count';
import SignIn from '../../Containers/SignIn';
import FileWrapper from '../../Containers/FileWrapper';

// begin of material ui //
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Filters from '../../Containers/Filters';
import ButtonComponent from '../button/button.component';
// end of material ui //

const styles = (theme) => ({
  root: {
    flexGrow: open ? 1 : 0,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const GridComponent = ({
  classes,
  isLoggedIn,
  hasRun,
  hasFiles,
  teamName,
  paging,
  files,
  deletedSize,
  onDeleteFile = () => {
  },
  handlePageUpdate = () => {
  },
}) => {

  let showFaq = false;

  const toggleFAQ = () => {
    showFaq = !showFaq;
  };

  const showFAQ = () => {
    if (!showFaq) {
      return null;
    }

    return (
      <div className="FAQ">
        <div className="FAQ__Wrapper">
          <FAQ onClose={toggleFAQ}/>
        </div>
      </div>
    );
  };

  const displayBar = (deletedSize, hasRun) => {
    return (
      <div className="FileWrapper__Details">
        <div>
          {deletedSize > 0 && hasRun ? (
            <p className="Count__Text">
              Nice! You just saved{' '}
              <span className="red">{formatBytes(deletedSize)}</span>
            </p>
          ) : null}
        </div>
        <div className="FileWrapper__Details-share">
          <p>
            <a
              href="https://twitter.com/intent/tweet?text=Delete%20and%20manage%20files%20from%20your%20Slack%20workspace%20with%20Slack%20Cleaner&url=https://www.slackcleaner.com&hashtags=slack&via=drewisthe"
              className="twitter-share-button Button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tweet about Slack Cleaner
            </a>
          </p>
          <Button
            onClick={toggleFAQ}
            text="Questions? FAQ"
            classes="FileWrapper__Details-faq"
          />
        </div>
      </div>
    );
  };

  const onPageDecrement = (val) => {
    if (val <= 1) return;
    handlePageUpdate(paging.page - 1);
  };

  const onPageIncrement = (val) => {
    if (val > paging.pages) return;
    handlePageUpdate(paging.page + 1);
  };

  const displayButtons = () => {

    if ( (paging.pages === 1) || !files.length) return;

    return (
      <div className="FileWrapper__paging">
        <ButtonComponent
          title={'Prev Page'} icon={'ChevronLeft'} disabled={paging.page === 1} color={'default'}
          onClick={onPageDecrement}
        />
        <span className="FileWrapper__paging-count">Page {paging.page}</span>
        <ButtonComponent
          title={'Next Page'} icon={'ChevronRight'} disabled={paging.page === paging.pages}
          color={'default'} onClick={onPageIncrement}
        />
      </div>
    );
  };

  const displayFilters = () => {
    if (!files.length) {
      return null;
    }
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Count
            data={files}
            total={paging.total}
            teamName={teamName}
          />
          {displayButtons()}
        </Paper>
      </Grid>
    );
    /*<Filters
          sizeValue={this.state.size}
          dateValue={this.state.date}
          onSizeChange={this.onSizeChange}
          onDateChange={this.onDateChange}
        />*/};

  const render = () => {
    return (!isLoggedIn ? (
      <SignIn/>
    ) : (
      <Fragment>
        {showFAQ()}
        <FileWrapper
          hasRun={hasRun}
          hasFiles={hasFiles}
          teamName={teamName}
          paging={paging}
          files={files}
          deleteFile={onDeleteFile}
          handlePageUpdate={handlePageUpdate}
        />
        {displayBar(deletedSize, hasRun)}
      </Fragment>
    ));
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={24}>

          {displayFilters()}

          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>
      </div>
      {render()}
    </Fragment>
  );
};

GridComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  hasRun: PropTypes.bool,
  hasFiles: PropTypes.bool,
  teamName: PropTypes.string,
  paging: PropTypes.object,
  files: PropTypes.array,
  deletedSize: PropTypes.number,
  onDeleteFile: PropTypes.func,
  handlePageUpdate: PropTypes.func,
};

export default withStyles(styles)(GridComponent);
