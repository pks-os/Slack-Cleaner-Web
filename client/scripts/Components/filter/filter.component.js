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
  date,
  startDate,
  endDate,
  onGetFiles = () => {},
  onDateChange = () => {},
}) => {

  const updateDate = ({ startDate, endDate }) => {
    onDateChange({ startDate, endDate });
  };

  return (
    <Fragment>
      <main className={classes.root}>
        <Form
          channels={channels}
          date={date}
          startDate={startDate}
          endDate={endDate}
          isLoggedIn={isLoggedIn}
          onGetFiles={onGetFiles}
          onDateChange={updateDate}
        />
      </main>
    </Fragment>
  );
};

FilterComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  channels: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  date: PropTypes.string,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onGetFiles: PropTypes.func,
  onDateChange: PropTypes.func,
};

export default withStyles(styles)(FilterComponent);
