import React from 'react';
import PropTypes from 'prop-types';

// begin of material ui//
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FolderShared from '@material-ui/icons/FolderShared';
import Help from '@material-ui/icons/Help';
import Person from '@material-ui/icons/Person';
import Close from '@material-ui/icons/Close';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import blue from '@material-ui/core/es/colors/blue';
// end of material ui//

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    color: blue[500]
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function ButtonComponent(props) {
  const {
    title,
    icon,
    disabled = false,
    onClick = () => {
    },
    classes,
  } = props;


  const renderIconComponent = () => {

    switch (icon) {

      case 'FolderShared':

        return (<FolderShared className={classes.extendedIcon}/>);

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


  return (
    <div>
      <Fab
        variant="extended"
        aria-label="Delete"
        size={'small'}
        className={classes.fab}
        disabled={disabled}
        onClick={onClick}
      >
        {renderIconComponent()}
        {title}
      </Fab>
    </div>
  );
}

ButtonComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default withStyles(styles)(ButtonComponent);
