import React, { Component, Fragment } from 'react';

import { FileContext } from '../Providers/FileProvider';
import Form from './Form';

class FileContainer extends Component {

  render() {
    return (
      <FileContext.Consumer>
        {(context) => (
          <Fragment>
            <Form
              getFiles={context.files}
              channels={context.channels}
              isLoggedIn={context.isLoggedIn}
            />
          </Fragment>
        )}
      </FileContext.Consumer>
    );
  }
}

export default FileContainer;
