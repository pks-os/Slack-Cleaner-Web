import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { sortFiles } from '../utils';

import Filters from './Filters';
import File from '../Components/File';
import Count from '../Components/Count';
import Button from '../Components/Button';

import friendlyBud from '../../images/friendlyBud.svg';
import stokedBud from '../../images/stokedBud.svg';
import congratsBud from '../../images/congratsBud.svg';

export default class FileWrapper extends Component {
  static propTypes = {
    deleteFile: PropTypes.func,
    handlePageUpdate: PropTypes.func,
    files: PropTypes.array,
    teamName: PropTypes.string,
    paging: PropTypes.object,
    hasRun: PropTypes.bool,
    hasFiles: PropTypes.bool,
  };

  state = {
    size: 'none',
    date: 'newest',
  };

  onSizeChange = (e) => {
    this.setState({
      size: e.target.value,
    });
  };

  onDateChange = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  onPageDecrement = (val) => {
    if (val <= 1) return;
    this.props.handlePageUpdate(this.props.paging.page - 1);
  };

  onPageIncrement = (val) => {
    if (val > this.props.paging.pages) return;
    this.props.handlePageUpdate(this.props.paging.page + 1);
  };

  displayButtons() {
    const paging = this.props.paging;
    if (paging.pages === 1) return;

    return (
      <div className="FileWrapper__paging">
        <Button
          onClick={this.onPageDecrement}
          disabled={paging.page === 1}
          text="Prev Page"
          classes="FileWrapper__paging-button"
        />
        <span className="FileWrapper__paging-count">Page {paging.page}</span>
        <Button
          onClick={this.onPageIncrement}
          disabled={paging.page === paging.pages}
          text="Next Page"
          classes="FileWrapper__paging-button"
        />
      </div>
    );
  }

  displayFilters() {
    const files = this.props.files;
    if (!files.length) {
      return null;
    }

    return (
      <div className="FileWrapper__Bar">
        <Count
          data={files}
          total={this.props.paging.total}
          teamName={this.props.teamName}
        />
        {this.displayButtons()}

        <Filters
          sizeValue={this.state.size}
          dateValue={this.state.date}
          onSizeChange={this.onSizeChange}
          onDateChange={this.onDateChange}
        />
      </div>
    );
  }

  renderFiles() {
    const files = sortFiles(this.props.files, this.state.size, this.state.date);

    return files.map((file) => (
      <div className="col-md-3" key={file.id}>
        <File
          details={file}
          deleteFile={this.props.deleteFile}
          className="col-md-4"
        />
      </div>
    ));
  }

  render() {
    if (!this.props.hasRun) {
      return (
        <div className="FileWrapper FileWrapper--start">
          <div className="FileWrapper__message">
            <img src={friendlyBud} alt="Slack Cleaner Bud" />
            <h2>Oh hey, welcome to the Slack Cleaner!</h2>

            <p className="lead">How to use this contraption</p>
            <ol>
              <li>
                Use the form to search the type of files you want to track down.
              </li>
              <li>
                Click the Get Files button to search for public files on your
                workspace. If you are an admin, you will see all public files
                you can delete.
              </li>
              <li>Start deleting some files and free up some space!</li>
            </ol>
          </div>
        </div>
      );
    } else if (this.props.files.length === 0 && this.props.hasFiles) {
      return (
        <div className="FileWrapper FileWrapper--start">
          <div className="FileWrapper__message">
            <img src={stokedBud} alt="Slack Cleaner Bud" />
            <h2>Zap! Deleted!</h2>
            <p className="lead">You get them all from that search!</p>
            <p>Try another search to see if there is anything left!</p>
          </div>
        </div>
      );
    } else if (this.props.files.length === 0 && this.props.hasRun) {
      return (
        <div className="FileWrapper FileWrapper--start">
          <div className="FileWrapper__message">
            <img src={congratsBud} alt="Slack Cleaner Bud" />
            <h2>Sweet! There is nothing there!</h2>
            <p className="lead">
              Usually no results is a bad thing, but this is great!
            </p>
            <p>Try another search to see if there is anything left!</p>
          </div>
        </div>
      );
    }
    return (
      <div className="FileWrapper">
        {this.displayFilters()}
        <div className="FileWrapper__List row">{this.renderFiles()}</div>
      </div>
    );
  }
}
