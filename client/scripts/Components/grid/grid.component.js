import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { formatBytes, sortFiles } from '../../utils';
import { calculateColumnsNumber } from '../../utils/cardSize.util';
import Count from '../Count';
import SignIn from '../../Containers/SignIn';
import ButtonComponent from '../button/button.component';
import CardComponent from '../card/card.component';

// begin of material ui //
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
  size,
  date,
  onDeleteFile = () => {},
  handlePageUpdate = () => {
  },
}) => {

  const renderBar = (deletedSize, hasRun) => {
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

  const renderButtons = () => {

    if ((paging.pages === 1) || !files.length) return;

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

  const renderFiles = () => {

    if (!files) {
      return null;
    }

    const sortedFiles = sortFiles(files, size, date);
    const columnsSize = calculateColumnsNumber(window.innerWidth);

    return sortedFiles.map((file) => (
      <Grid item xs={columnsSize} key={file.id}>
        <Paper className={classes.paper}>
          <CardComponent
            details={file}
            deleteFile={onDeleteFile}
          />
        </Paper>
      </Grid>
    ));
  };

  const renderInfo = () => {

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
        </Paper>
      </Grid>
    );
    /*<Filters
          sizeValue={this.state.size}
          dateValue={this.state.date}
          onSizeChange={this.onSizeChange}
          onDateChange={this.onDateChange}
        />*/
  };

  const renderDeletedInfo = (deletedSize, hasRun) => {

    if (!files.length) {
      return null;
    }
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {!(deletedSize > 0 && hasRun) ? (
            <p className="Count__Text">
              Nice! You just saved{' '}
              <span className="red">{formatBytes(deletedSize)}</span>
            </p>
          ) : null}
        </Paper>
      </Grid>
    );
  };

  const renderPagination = () => {

    if (!files.length) {
      return null;
    }
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {renderButtons()}
        </Paper>
      </Grid>
    );
  };

  const render = () => {
    return (!isLoggedIn ? (
      <SignIn/>
    ) : (
      <Fragment>
        {renderBar(deletedSize, hasRun)}
      </Fragment>
    ));
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={24}>

          {renderInfo()}
          {renderDeletedInfo()}
          {renderFiles()}
          {renderPagination(deletedSize, hasRun)}

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
  size: PropTypes.string,
  date: PropTypes.string,
  onDeleteFile: PropTypes.func,
  handlePageUpdate: PropTypes.func,
};

export default withStyles(styles)(GridComponent);
