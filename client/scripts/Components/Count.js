import React from 'react';
import PropTypes from 'prop-types';
import { formatBytes } from '../utils';

// begin of material UI
import FileCopy from '@material-ui/icons/FileCopy';
import Equalizer from '@material-ui/icons/Equalizer';
import Storage from '@material-ui/icons/Storage';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/core/SvgIcon/SvgIcon';
import CardActions from '@material-ui/core/CardActions';
// end of material UI

const Count = ({ data = [], teamName, total }) => {
  const amount = data.length;
  const fileSize = data.reduce((count, file) => {
    return count + file.size;
  }, 0);

  const messaging = total > 1 ? 'There are' : 'There is';
  const plural = total > 1 ? 'files' : 'file';
  const finishText = 'that you can delete from your workspace.';

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

Count.propTypes = {
  data: PropTypes.array,
  teamName: PropTypes.string,
  total: PropTypes.number,
};

export default Count;
