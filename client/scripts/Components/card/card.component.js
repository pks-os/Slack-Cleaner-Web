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
import Storage from '@material-ui/icons/Storage';
import AccessTime from '@material-ui/icons/AccessTime';
import CardActions from '@material-ui/core/CardActions';
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
  header: {
    padding: '0'
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
  action: {
    margin: '0',
    marginLeft: 'auto'
  }
});

//Component

const CardComponent = ({
  classes,
  details,
  deleteFile,
}) => {

  const dateCreated = moment.unix(details.created).fromNow();
  const fileSize = formatBytes(details.size);
  const shortFileName = (details.name.length && details.name.length >= 30) ? `${details.name.slice(0, 30)}...` : details.name;
  const avatarCssType = detectFileType(details.filetype).cssType;

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        avatar={
          <Tooltip title={details.name}>
            <IconButton color="inherit">
              <Avatar aria-label={avatarCssType} className={detectColor(avatarCssType, classes)}>
                {detectFileType(details.filetype).icon}
              </Avatar>
            </IconButton>
          </Tooltip>
        }
        title={shortFileName}
      />
      <CardMedia className={classes.media} image={renderImage(details)} title={shortFileName}/>
      <CardActions className={classes.actions} disableActionSpacing>

        <Tooltip title={fileSize}>
          <IconButton color="inherit">
            <Storage />
          </IconButton>
        </Tooltip>

        <Tooltip title={dateCreated}>
          <IconButton color="inherit">
            <AccessTime />
          </IconButton>
        </Tooltip>

        <Tooltip title={'Delete'}>
          <IconButton className={classes.action} onClick={() => deleteFile(details.id)}><Delete/></IconButton>
        </Tooltip>

      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  details: PropTypes.object,
  deleteFile: PropTypes.func,
};

export default withStyles(styles)(CardComponent);
