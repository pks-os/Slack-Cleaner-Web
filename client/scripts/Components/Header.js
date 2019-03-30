import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ButtonComponent from './button/button.component';

const Header = ({
  isLoggedIn = false,
  name = '',
  avatar = '',
  isAdmin = false,
}) => {
  let markup = null;

  const logout = (e) => {
    e.preventDefault();
    window.location.replace('api/logout');
  };

  if (isLoggedIn && name && avatar) {
    markup = (
      <Fragment>
        <p className="Header__Name">
          Hey {name} {isAdmin && <span className="red"> - ADMIN</span>}
        </p>
        <img className="Header__Avatar" src={avatar} alt={name}/>
        <ButtonComponent title={'Logout'} icon={'Person'} href="api/logout" onClick={logout}/>
      </Fragment>
    );
  } else {
    markup = (
      <Fragment>
        <a className="LoginButton" href="auth/slack">
          <img
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

  return (
    <header className="Header">
      <h1 className="Header__Logo">Slack Cleaner</h1>
      <div className="Header__Meta"> {markup}</div>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.string,
  isAdmin: PropTypes.bool,
};

export default Header;
