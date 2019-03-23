import React from 'react';
import PropTypes from 'prop-types';

import { formatBytes } from '../utils';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import blue from '@material-ui/core/es/colors/blue';

import NoFileImage from '../../images/file.svg';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
});

function renderImage(file) {
  switch (file.mimetype) {
    case 'image/jpeg':
      return file.thumb_480 || file.thumb_360;
    case 'image/png':
      return file.thumb_480 || file.thumb_360;
    case 'image/svg+xml':
      return file.url_private;
    case 'image/gif':
      return file.thumb_360_gif;
    default:
      return NoFileImage;
  }
}


class RecipeReviewCard extends React.Component {

  render() {
    const { classes, details, deleteFile } = this.props;
    const date = moment.unix(details.created).fromNow();
    const sizeAndDate = `${formatBytes(details.size)} / ${date}`;
    const shortFileName = (details.name.length && details.name.length >= 10) ? `${details.name.slice(0, 10)}...` : details.name;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>{details.filetype}</Avatar>
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
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  details: PropTypes.object,
  deleteFile: PropTypes.func,
};

export default withStyles(styles)(RecipeReviewCard);
