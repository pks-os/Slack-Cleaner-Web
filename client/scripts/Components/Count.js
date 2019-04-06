import React from 'react';
import PropTypes from 'prop-types';
import { formatBytes } from '../utils';

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
      <p className="Count__Text">
        {messaging}{' '}
        <span className="purple">
          {total} {plural}
        </span>{' '}
        worth{' '}
        <span className="red">{formatBytes(fileSize)}</span>
        {' '}{finishText}
      </p>
    </div>
  );
};

Count.propTypes = {
  data: PropTypes.array,
  teamName: PropTypes.string,
  total: PropTypes.number,
};

export default Count;
