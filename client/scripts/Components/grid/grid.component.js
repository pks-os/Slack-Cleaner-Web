import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { calculateColumnsNumber } from '../../utils/cardSize.util';
import CountComponent from '../count/count.component';
import CardComponent from '../card/card.component';
import nothingFound from '../../../images/nothingFound.png';
import GridLoaderComponent from '../content-loaders/grid-loader.component';

// begin of material ui //
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
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
  loadingPaper: {
    height: '400px',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  loadingInfoPaper: {
    height: '80px',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  pagingAction: {
    margin: '5px',
  },
  fullWidth: {
    width: '100%',
  },
  loading: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50px',
    height: '50px',
    marginTop: '20%',
  },
});

const GridComponent = ({
  classes,
  isLoggedIn,
  hasFiles,
  filesLoading,
  teamName,
  paging,
  files,
  size,
  date,
  onDeleteFile = () => {
  },
  handlePageUpdate = () => {
  },
}) => {

  const onPageDecrement = (val) => {
    if (val <= 1) return;
    handlePageUpdate(paging.page - 1);
  };

  const onPageIncrement = (val) => {
    if (val > paging.pages) return;
    handlePageUpdate(paging.page + 1);
  };

  const renderButtons = () => {

    return (
      <div className="FileWrapper__paging">
        <IconButton>
          <ChevronLeft className={classes.pagingAction} disabled={paging.page === 1} onClick={onPageDecrement}/>
        </IconButton>

        <span className="FileWrapper__paging-count">{paging.page}</span>

        <IconButton>
          <ChevronRight
            className={classes.pagingAction} disabled={paging.page === paging.pages}
            onClick={onPageIncrement}
          />
        </IconButton>

      </div>
    );
  };

  const renderFiles = () => {

    const columnsSize = calculateColumnsNumber(window.innerWidth);

    if (filesLoading) {

      const loadingFiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

      return loadingFiles.map((loadingFile) => (<Grid item xs={columnsSize} key={loadingFile}>
        <Paper className={classes.loadingPaper}>
          <GridLoaderComponent height={370}/>
        </Paper>
      </Grid>));

    } else {

      return files.length ? files.map((file) => (
        <Grid item xs={columnsSize} key={file.id}>
          <Paper className={classes.paper}>
            <CardComponent
              details={file}
              deleteFile={onDeleteFile}
            />
          </Paper>
        </Grid>
      )) : <img src={nothingFound} className={classes.fullWidth} alt="Nothing Found"/>;
    }
  };

  const renderInfo = () => {

    if (filesLoading) {
      return (
        <Grid item xs={12}>
          <Paper className={classes.loadingInfoPaper}>
            <GridLoaderComponent height={80}/>
          </Paper>
        </Grid>
      );
    } else if (files.length){
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CountComponent
              data={files}
              total={paging.total}
              teamName={teamName}
            />
          </Paper>
        </Grid>
      );
    }
  };

  const renderPagination = () => {

    if ((paging.pages === 1) || !files.length) {
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

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={24}>

          {renderInfo()}
          {renderFiles()}
          {renderPagination()}

        </Grid>
      </div>
    </Fragment>
  );
};

GridComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  hasFiles: PropTypes.bool,
  teamName: PropTypes.string,
  paging: PropTypes.object,
  files: PropTypes.array,
  filesLoading: PropTypes.bool,
  size: PropTypes.string,
  date: PropTypes.string,
  onDeleteFile: PropTypes.func,
  handlePageUpdate: PropTypes.func,
};

export default withStyles(styles)(GridComponent);
