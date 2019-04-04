import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// begin of material ui //
import { withStyles } from '@material-ui/core/styles';
import Form from '../../Containers/Form';
// end of material ui //

const styles = {
  root: {
    backgroundColor: '$light',
    display: 'flex'
  }
};

const FilterComponent = ({
  classes,
  channels,
  isLoggedIn,
  onGetFiles = () => {},
}) => {
  return (
    <Fragment>
      <main className={classes.root}>
        <Form
          channels={channels}
          isLoggedIn={isLoggedIn}
          onGetFiles={onGetFiles}
        />
      </main>
    </Fragment>
  );
};

FilterComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  channels: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  onGetFiles: PropTypes.func,
};

export default withStyles(styles)(FilterComponent);
