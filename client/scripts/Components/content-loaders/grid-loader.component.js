import React from 'react';
import ContentLoader from 'react-content-loader';

import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  fullWidth: {
    width: '100%',
  },
});

const GridLoaderComponent = ({ classes, height }) => {

  return (
    <ContentLoader
      speed={2}
      className={classes.fullWidth}
      style={{ 'height': height }}
      primaryColor="#efefef"
      secondaryColor="#dad9d9"
    >
      <rect x="0" y="0" rx="0" ry="0" width="100%" height={height}/>
    </ContentLoader>);
};

GridLoaderComponent.propTypes = {
  height: PropTypes.string,
};

export default withStyles(styles)(GridLoaderComponent);

