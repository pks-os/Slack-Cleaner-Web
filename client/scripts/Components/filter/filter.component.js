import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Form from '../../Containers/Form';

// begin of material ui //
import { withStyles } from '@material-ui/core/styles';
// end of material ui //

const styles = {
  root: {
    backgroundColor: '$light',
    display: 'flex',
  },
};

const FilterComponent = ({
  classes,
  channels,
  isLoggedIn,
  date,
  startDate,
  endDate,
  sortBySizeValue,
  sortByDateValue,
  sortBySizeValues,
  sortByDateValues,
  onSortBySizeValueChange  = () => {},
  onSortByDateValueChange  = () => {},
  onGetFiles = () => {},
  onDateChange = () => {},
}) => {

  const updateDate = ({ startDate, endDate }) => {
    onDateChange({ startDate, endDate });
  };

  const handleSortByDateSelect = (value) => {
    onSortByDateValueChange(value);
  };

  const handleSortBySizeSelect = (value) => {
    onSortBySizeValueChange(value);
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
          sortByDateValues={sortByDateValues}
          sortBySizeValues={sortBySizeValues}
          sortByDateValue={sortByDateValue}
          sortBySizeValue={sortBySizeValue}
          onSortBySizeValueChange={handleSortBySizeSelect}
          onSortByDateValueChange={handleSortByDateSelect}
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
  sortBySizeValue: PropTypes.string,
  sortByDateValue: PropTypes.string,
  sortBySizeValues: PropTypes.array,
  sortByDateValues: PropTypes.array,
  onSortBySizeValueChange: PropTypes.func,
  onSortByDateValueChange: PropTypes.func,
};

export default withStyles(styles)(FilterComponent);
