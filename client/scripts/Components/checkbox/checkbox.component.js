import React from 'react';
import PropTypes from 'prop-types';

// begin of material ui //
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
// end of material ui //

const styles = {
  root: {
    width: '100%',
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  formControl: {
    width: '100%',
    marginLeft: '0px'
  },
  label: {
    fontSize: '15px'
  },
  checked: {},
};

const CheckboxComponent = ({
  classes,
  label = '',
  checked = false,
  onChange = () => {},
  value = '',
}) => {
  return (
    <FormControlLabel
      className={classes.formControl}
      classes={{ label: classes.label }}
      control={
        <IconButton>
          <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} value={value} checked={checked} onChange={onChange}/>
        </IconButton>
      }
      label={label}
    />
  );
};

CheckboxComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default withStyles(styles)(CheckboxComponent);
