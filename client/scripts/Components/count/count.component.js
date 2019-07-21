import React from 'react';
import PropTypes from 'prop-types';
import { formatBytes } from '../../utils';

// begin of material UI
import FileCopy from '@material-ui/icons/FileCopy';
import Storage from '@material-ui/icons/Storage';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// end of material UI

const CountComponent = ({ data = [], total }) => {
  const fileSize = data.reduce((count, file) => {
    return count + file.size;
  }, 0);

  const plural = total > 1 ? 'files' : 'file';

  return (
    <div className="Count">

      <Tooltip title={'Files'}>
        <IconButton><FileCopy/></IconButton>
      </Tooltip>

      {total} {plural}{' '}

      <Tooltip title={'Storage'}>
        <IconButton><Storage/></IconButton>
      </Tooltip>

      {formatBytes(fileSize)}{' '}

    </div>
  );
};

CountComponent.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number,
};

export default CountComponent;
