import React from 'react';

import LoaderComponent from '../loader/loader.component';

// begin of material UI
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
// end of material UI

const BulkDeleteComponent = ({
  bulkStart,
  bulkDeleteStart = () => {},
}) => {

  const renderActions = () => {

    return bulkStart ? (
      <LoaderComponent/>
    ) : (<Tooltip title={'Start'}>
      <IconButton onClick={bulkDeleteStart}><PlayArrowRounded/></IconButton>
    </Tooltip>);
  };

  return (
    <div className="Count">

      <Tooltip title={'Bulk delete'}>
        <IconButton><DeleteSweep/></IconButton>
      </Tooltip>

      {renderActions()}

    </div>
  );
};

BulkDeleteComponent.propTypes = {
  bulkStart: PropTypes.bool,
  bulkDeleteStart: PropTypes.func,
  bulkDeleteStop: PropTypes.func,
};

export default BulkDeleteComponent;
