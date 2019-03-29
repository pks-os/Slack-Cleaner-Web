import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Components/Button';
import Checkbox from '../Components/Checkbox';
import Label from '../Components/Label';
import DateFields from '../Components/DateFields';
import SelectComponent from '../Components/select/select.component';
import LabelComponent from '../Components/label/label.component';

import { TYPES_DICT, INIT_TYPES_STATE } from '../../../config/constants';

class Form extends Component {
  static propTypes = {
    getFiles: PropTypes.func,
    channels: PropTypes.array,
    isLoggedIn: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      types: INIT_TYPES_STATE,
      channel: '',
    };
  }

  getFiles = () => {
    const { startDate, endDate, types, channel } = this.state;
    const fileTypes = Object.keys(types)
      .filter((type) => types[type] === true)
      .join(',');
    this.props.getFiles(startDate, endDate, fileTypes, channel);
  };

  updateField = (field, value) => {
    this.setState({ [field]: value });
  };

  updateDate = ({ startDate, endDate }) => {
    // console.log(startDate, endDate);
    this.setState({ startDate, endDate });
  };

  updateType = (e) => {
    const selected = e.target.value;
    const types = this.state.types;
    const value = types[selected];
    if (selected === 'all') {
      this.setState({
        all: true,
        types: INIT_TYPES_STATE,
      });
      return;
    }

    this.setState({
      types: { ...this.state.types, all: false, [selected]: !value },
    });
  };

  handleChannelSelect = (e) => {

    this.setState({
      channel: e.target.value,
    });
  };

  renderChannelSelect = () => {
    const channels = this.props.channels;
    if (channels.length) {
      return (
        <div>
          <LabelComponent title={'Channel'}/>
          <SelectComponent
            isChannel
            emptyName={'All Channels'}
            options={channels}
            value={this.state.channel}
            onChange={this.handleChannelSelect}
          />
        </div>
      );
    }
  };

  renderTypeOptions = () => {
    return Object.keys(TYPES_DICT).map((type) => {
      return (
        <Checkbox
          key={TYPES_DICT[type]}
          checked={this.state.types[type]}
          onChange={this.updateType}
          value={type}
          label={TYPES_DICT[type]}
        />
      );
    });
  };

  render() {
    const typeSelected = Object.keys(this.state.types).filter(
      (type) => this.state.types[type] === true,
    );
    return (
      <div className="Form">
        <h2 className="Form__SearchInfo">Search for Files</h2>
        <div className="Form__Field">{this.renderChannelSelect()}</div>
        <div className="Form__Field">
          <LabelComponent title={'Date Range'}/>
          <DateFields
            onChange={this.updateDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
        </div>
        <div className="Form__Field">
          <LabelComponent title={'Type of Files'}/>
          <Checkbox
            checked={!typeSelected.length}
            onChange={this.updateType}
            value="all"
            label="All"
          />
          {this.renderTypeOptions()}
        </div>
        <Button
          onClick={this.getFiles}
          text="Get Files"
          large
          fullWidth
          disabled={!this.props.isLoggedIn}
        />
      </div>
    );
  }
}

export default Form;
