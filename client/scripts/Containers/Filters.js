import React from 'react';
import PropTypes from 'prop-types';

import SelectComponent from '../Components/select/select.component';

const CHANNELS = [
  { id: 'newest', name: 'Newest' },
  { id: 'oldest', name: 'Oldest' },
];

const SIZE = [
  { id: 'largest', name: 'Largest' },
  { id: 'smallest', name: 'Smallest' },
];

const Filters = ({ onDateChange, onSizeChange, sizeValue, dateValue }) => {
  return (
    <div className="Filters">
      <SelectComponent
        label="Sort by Date"
        options={CHANNELS}
        onChange={onDateChange}
        value={dateValue}
      />
      <SelectComponent
        label="Sort by Size"
        emptyValue="none"
        emptyText="None"
        options={SIZE}
        onChange={onSizeChange}
        value={sizeValue}
      />
    </div>
  );
};

Filters.propTypes = {
  onDateChange: PropTypes.func,
  onSizeChange: PropTypes.func,
  sizeValue: PropTypes.string,
  dateValue: PropTypes.string,
};

export default Filters;
