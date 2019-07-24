import React from 'react';
import PropTypes from 'prop-types';

// begin of material ui//
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// end of material ui//

const styles = ((theme) => ({
  progress: {
    margin: '2px',
    width: '20px',
    height: '20px',
  },
}));

function LoaderComponent({ classes }) {

  return (
    <Tooltip title={'Deleting'}>
      <IconButton>
        <CircularProgress className={classes.progress} size={20} />
      </IconButton>
    </Tooltip>
  );
}

LoaderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoaderComponent);
