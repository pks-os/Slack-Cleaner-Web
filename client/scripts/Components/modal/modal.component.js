import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/*begin of material-ui*/
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
/*end of material-ui*/

import ButtonComponent from '../button/button.component';
import { FAQ as FAQQuestions } from '../../../../config/constants';

const styles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
  faqQuestion: {
    fontSize: '15px',
    marginBottom: 0,
    fontWeight: 700,
  },
  faqAnswer: {
    fontSize: '15px',
  }
});

class ModalComponent extends React.Component {
  state = {
    fullWidth: true,
    maxWidth: 'md',
  };

  handleClose = () => {
    this.props.onClose(false);
  };

  render() {
    const { classes, open } = this.props;

    return (
      <Fragment>
        <Dialog
          wrapper={'span'}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Welcome to the Slack Cleaner!</DialogTitle>
          <DialogContent>
            <DialogContentText>

              Delete files from your Slack Workspace!
              <br/>
              Slack Deletron uses the Slack API to help you search, manage and delete files from your Slack Workspace.
              <br/>
              We save nothing (seriously) and only help you get rid of stuff.
              <br/>
              <br/>
              <br/>

              {FAQQuestions.map((faq, index) => (
                <span key={index}>
                  <span
                    className={classes.faqQuestion}
                    dangerouslySetInnerHTML={{ __html: faq.question }}
                  />
                  <br/>
                  <span
                    className={classes.faqAnswer}
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                  <br/>
                  <br/>
                </span>
              ))}

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonComponent title={'Close'} onClick={this.handleClose} color="default"/>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

ModalComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default withStyles(styles)(ModalComponent);
