import React from 'react';
import PropTypes from 'prop-types';

// begin of material ui//
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Folder from '@material-ui/icons/Folder';
import Help from '@material-ui/icons/Help';
import Person from '@material-ui/icons/Person';
import Close from '@material-ui/icons/Close';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
// end of material ui//

const smallScreen = window.innerWidth < 800;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  avatar: {
    height: '25px',
    borderRadius: '50%',
    width: '25px',
    marginRight: '30px',
  },
  floatRight: {
    float: 'right',
    margin: smallScreen ? '15px 5px 0 0' : ''
  }
});

function ButtonComponent(props) {
  const {
    title,
    icon,
    disabled = false,
    floatToRight,
    color,
    avatar,
    name,
    onClick = () => {
    },
    classes,
  } = props;



  const renderIconComponent = () => {

    switch (icon) {

      case 'Folder':

        return (<Folder className={classes.extendedIcon}/>);

      case 'Help':

        return (<Help className={classes.extendedIcon}/>);

      case 'Close':

        return (<Close className={classes.extendedIcon}/>);

      case 'Person':

        return (<Person className={classes.extendedIcon}/>);

      case 'ChevronLeft':

        return (<ChevronLeft className={classes.extendedIcon}/>);

      case 'ChevronRight':

        return (<ChevronRight className={classes.extendedIcon}/>);

      default:

        return (null);
    }
  };

  const renderAvatar = () => {
    return (<img className={classes.avatar} src={avatar} alt={name}/>);
  };

  return (
    <Button variant="contained" color={color} className={`${classes.button} + ${(floatToRight ? classes.floatRight : '')}`} disabled={disabled} onClick={onClick}>
      {avatar ? renderAvatar() : renderIconComponent()}
      {title}
    </Button>
  );
}

ButtonComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  floatToRight: PropTypes.bool,
  icon: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default withStyles(styles)(ButtonComponent);
