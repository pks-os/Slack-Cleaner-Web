import React, { Component, Fragment } from 'react';

import { FileContext } from '../Providers/FileProvider';
import Form from './Form';

class FileContainer extends Component {

  render() {
    return (
      <FileContext.Consumer>
        {(context) => (
          <Fragment>
            <main className="MainContent cf">
              <Form
                getFiles={context.files}
                channels={context.channels}
                isLoggedIn={context.isLoggedIn}
              />
            </main>
          </Fragment>
        )}
      </FileContext.Consumer>
    );
  }
}

export default FileContainer;
