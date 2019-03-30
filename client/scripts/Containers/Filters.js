import React from 'react';
import PropTypes from 'prop-types';

import SelectComponent from '../Components/select/select.component';
import Label from '../Components/Label';

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

      <Label darkLabel>Sort by Date</Label>
      <SelectComponent
        options={CHANNELS}
        onChange={onDateChange}
        value={dateValue}
      />

      <Label darkLabel>Sort by Size</Label>
      <SelectComponent
        emptyName={'None'}
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
