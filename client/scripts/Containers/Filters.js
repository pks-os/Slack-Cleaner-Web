import React from 'react';
import PropTypes from 'prop-types';

import SelectComponent from '../Components/select/select.component';
import LabelComponent from '../Components/label/label.component';

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

      <LabelComponent title={'Sort by Date'}/>
      <SelectComponent
        options={CHANNELS}
        onChange={onDateChange}
        value={dateValue}
      />

      <LabelComponent title={'Sort by Size'}/>
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
