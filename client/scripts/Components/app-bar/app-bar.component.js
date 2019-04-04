import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ButtonComponent from '../button/button.component';

// begin of material ui //
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import red from '@material-ui/core/es/colors/red';
// end of material ui //

const drawerWidth = 240;

const smallScreen = window.innerWidth < 800;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  avatar: {
    height: '25px',
    borderRadius: '50%',
    width: '25px',
    marginRight: '30px',
  },
  red: {
    color: red[500],
  },
  headerName: {
    marginRight: '20px',
    marginBottom: '0',
    display: smallScreen ? 'none' : 'block',
  },
  contents: {
    display: 'contents',
  },
  slackLogin: {
    borderRadius: '50px',
  },
});

const AppBarComponent = ({
  classes,
  open,
  value = 'Login',
  isLoggedIn = false,
  name = '',
  avatar = '',
  isAdmin = false,
  onChange = () => {
  },
  onLogout = () => {
  },
}) => {

  let markup = null;

  const handleEvent = (e) => {
    onChange(e);
  };

  const handleLogout = (e) => {
    onLogout(e);
  };

  if (isLoggedIn && name && avatar) {
    markup = (
      <Fragment>
        <p className={classes.headerName}>
          {name} {isAdmin && <span className={classes.red}> - admin</span>}
        </p>
        <ButtonComponent
          avatar={avatar}
          name={name}
          title={'Logout'}
          icon={'Person'}
          href="api/logout"
          color={'default'}
          onClick={handleLogout}
        />
      </Fragment>
    );
  } else {
    markup = (
      <Fragment>
        <a className="LoginButton" href="auth/slack">
          <img
            className={classes.slackLogin}
            alt="Sign in with Slack"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
      </Fragment>
    );
  }

  const iconButton = isLoggedIn ? (<IconButton
    color="inherit"
    aria-label="Open drawer"
    onClick={handleEvent}
    className={classNames(classes.menuButton, open && classes.hide)}
  >
    <MenuIcon/>
  </IconButton>) : null;


  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {iconButton}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Slack Cleaner
          </Typography>
          <div className={classes.contents} color="inherit">{markup}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  value: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.string,
  isAdmin: PropTypes.bool,
  onChange: PropTypes.func,
  onLogout: PropTypes.func,
};

export default withStyles(styles)(AppBarComponent);
