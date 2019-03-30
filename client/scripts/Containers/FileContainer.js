import React, { Component, Fragment } from 'react';

import { formatBytes } from '../utils';
import { FileContext } from '../Providers/FileProvider';
import Form from './Form';
import FileWrapper from './FileWrapper';
import SignIn from './SignIn';
import ButtonComponent from '../Components/button/button.component';
import FAQ from '../Components/FAQ';

class FileContainer extends Component {
  state = {
    showFAQ: false,
  };

  toggleFAQ = () => {
    this.setState({ showFAQ: !this.state.showFAQ });
  };

  showFAQ = () => {
    if (!this.state.showFAQ) {
      return null;
    }

    return (
      <div className="FAQ">
        <div className="FAQ__Wrapper">
          <FAQ onClose={this.toggleFAQ} />
        </div>
      </div>
    );
  };

  displayBar = (deletedSize, hasRun) => {
    return (
      <div className="FileWrapper__Details">
        <div>
          {deletedSize > 0 && hasRun ? (
            <p className="Count__Text">
              Nice! You just saved{' '}
              <span className="red">{formatBytes(deletedSize)}</span>
            </p>
          ) : null}
        </div>
        <div className="FileWrapper__Details-share">
          <p>
            <a
              href="https://twitter.com/intent/tweet?text=Delete%20and%20manage%20files%20from%20your%20Slack%20workspace%20with%20Slack%20Cleaner&url=https://www.slackcleaner.com&hashtags=slack&via=drewisthe"
              className="twitter-share-button Button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tweet about Slack Cleaner
            </a>
          </p>
          <ButtonComponent title="Questions? FAQ" icon={'Help'} onClick={this.toggleFAQ} />
        </div>
      </div>
    );
  };

  render() {
    return (
      <FileContext.Consumer>
        {(context) => (
          <Fragment>
            <main className="MainContent cf">
              <Form
                getFiles={context.getFiles}
                channels={context.channels}
                isLoggedIn={context.isLoggedIn}
              />
              {!context.isLoggedIn ? (
                <SignIn />
              ) : (
                <Fragment>
                  {this.showFAQ()}
                  <FileWrapper
                    hasRun={context.state.hasRun}
                    hasFiles={context.state.hasFiles}
                    teamName={context.teamName}
                    paging={context.state.paging}
                    files={context.state.files}
                    deleteFile={context.deleteFile}
                    handlePageUpdate={context.handlePageUpdate}
                  />
                  {this.displayBar(
                    context.state.deletedSize,
                    context.state.hasRun
                  )}
                </Fragment>
              )}
            </main>
          </Fragment>
        )}
      </FileContext.Consumer>
    );
  }
}

export default FileContainer;
