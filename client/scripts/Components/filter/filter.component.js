import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Form from '../../Containers/Form';
import FAQ from '../FAQ';

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
  showFaq,
  onGetFiles = () => {
  },
  onDateChange = () => {
  },
  onToggleFAQ = () => {
  },
}) => {

  const showFAQ = () => {
    if (!showFaq) {
      return null;
    }

    return (
      <div className="FAQ">
        <div className="FAQ__Wrapper">
          <FAQ onClose={onToggleFAQ}/>
        </div>
      </div>
    );
  };

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
  showFaq: PropTypes.bool,
  onGetFiles: PropTypes.func,
  onDateChange: PropTypes.func,
  onToggleFAQ: PropTypes.func,
};

export default withStyles(styles)(FilterComponent);
