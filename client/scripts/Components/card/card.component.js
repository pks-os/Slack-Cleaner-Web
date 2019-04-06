import React from 'react';
import PropTypes from 'prop-types';

// begin of material UI
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import blue from '@material-ui/core/es/colors/blue';
import cyan from '@material-ui/core/es/colors/cyan';
import red from '@material-ui/core/es/colors/red';
import orange from '@material-ui/core/es/colors/orange';
import green from '@material-ui/core/es/colors/green';
import grey from '@material-ui/core/es/colors/grey';
import purple from '@material-ui/core/es/colors/purple';
// end of material UI

import moment from 'moment';
import { formatBytes } from '../../utils';
import { renderImage } from '../../utils/render.util';
import { detectColor, detectFileType } from '../../utils/fileType.util';

const styles = (theme) => ({
  card: {
    maxWidth: 400,
    marginBottom: '15px',
    boxShadow: 'none',
  },
  media: {
    height: 0,
    paddingTop: '120%',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
  },
  notes: {
    backgroundColor: cyan[300],
  },
  files: {
    backgroundColor: red[500],
  },
  excels: {
    backgroundColor: green[500],
  },
  videos: {
    backgroundColor: grey[500],
  },
  photos: {
    backgroundColor: purple[500],
  },
  presentations: {
    backgroundColor: orange[500],
  },
});

//Component

const CardComponent = ({
  classes,
  details,
  deleteFile,
}) => {

  const date = moment.unix(details.created).fromNow();
  const sizeAndDate = `${formatBytes(details.size)} / ${date}`;
  const shortFileName = (details.name.length && details.name.length >= 10) ? `${details.name.slice(0, 10)}...` : details.name;
  const avatarCssType = detectFileType(details.filetype).cssType;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Tooltip title={avatarCssType}>
            <Avatar aria-label={avatarCssType} className={detectColor(avatarCssType, classes)}>
              {detectFileType(details.filetype).icon}
            </Avatar>
          </Tooltip>
        }
        action={
          <IconButton onClick={() => deleteFile(details.id)}><Delete/></IconButton>
        }
        title={
          <div className={classes.title}>{shortFileName}</div>
        }
        subheader={sizeAndDate}
      />
      <CardMedia className={classes.media} image={renderImage(details)} title={shortFileName}/>
    </Card>
  );
};

CardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  details: PropTypes.object,
  deleteFile: PropTypes.func,
};

export default withStyles(styles)(CardComponent);
