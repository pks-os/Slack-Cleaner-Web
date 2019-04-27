import React from 'react';
import PropTypes from 'prop-types';

// begin of material UI
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// end of material UI

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  select: {
    fontSize: '15px',
  },
  selectItem: {
    fontSize: '15px',
  },
});


const SelectComponent = ({
  classes,
  value = '',
  labelName,
  isChannel = false,
  emptyName = '',
  options = [],
  onChange = () => {
  },
}) => {

  const handleEvent = (e) => {
    if (e.target.value !== value) {
      onChange(e.target.value);
    }
  };

  const mutatedOptions = isChannel ? options.map((option) => {
    return {
      ...option,
      name: `#${option.name}`,
    };
  }) : [...options];

  const emptyMenuItem = (emptyName !== '') ?
    <MenuItem className={classes.selectItem} value="" selected={'' === value}>{emptyName}</MenuItem> : null;

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-label">
          {labelName}
        </InputLabel>
        <Select
          value={value}
          name="select"
          className={classes.select}
          onChange={handleEvent}
          input={
            <OutlinedInput
              labelWidth={100}
              name="label"
              id="outlined-label"
            />
          }
        >
          {emptyMenuItem}
          {mutatedOptions.map((option) => (
            <MenuItem className={classes.selectItem} selected={option.id === value} key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
};

SelectComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  labelName: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.array,
  isChannel: PropTypes.bool,
  onChange: PropTypes.func,
};

export default withStyles(styles)(SelectComponent);
