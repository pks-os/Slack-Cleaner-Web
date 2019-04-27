import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { calculateColumnsNumber } from '../../utils/cardSize.util';
import Count from '../Count';
import CardComponent from '../card/card.component';
import nothingFound from '../../../images/nothingFound.png';

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
  pagingAction: {
    margin: '5px',
  },
});

const GridComponent = ({
  classes,
  isLoggedIn,
  hasFiles,
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
          <ChevronRight className={classes.pagingAction} disabled={paging.page === paging.pages} onClick={onPageIncrement}
          />
        </IconButton>

      </div>
    );
  };

  const renderFiles = () => {

    if (!files.length) {
      return <img src={nothingFound} alt="Nothing Found"/>;
    } else {

      const columnsSize = calculateColumnsNumber(window.innerWidth);

      return files.map((file) => (
        <Grid item xs={columnsSize} key={file.id}>
          <Paper className={classes.paper}>
            <CardComponent
              details={file}
              deleteFile={onDeleteFile}
            />
          </Paper>
        </Grid>
      ));
    }
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
  size: PropTypes.string,
  date: PropTypes.string,
  onDeleteFile: PropTypes.func,
  handlePageUpdate: PropTypes.func,
};

export default withStyles(styles)(GridComponent);
