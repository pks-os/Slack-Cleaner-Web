import React from 'react';
import PropTypes from 'prop-types';

// begin of material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// end of material UI

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    fontSize: '15px',
    borderRadius: '50px'
  }
});

function LabelComponent(props) {
  const { title, classes } = props;
  return (
    <div>
      <Button color="primary" className={classes.button}>
        {title}
      </Button>
    </div>
  );
}

LabelComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(LabelComponent);
