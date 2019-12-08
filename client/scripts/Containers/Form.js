import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonComponent from '../Components/button/button.component';
import DatePickerComponent from '../Components/date/datepicker.component';
import SelectComponent from '../Components/select/select.component';
import LabelComponent from '../Components/label/label.component';
import CheckboxComponent from '../Components/checkbox/checkbox.component';

import { TYPES_DICT, INIT_TYPES_STATE } from '../../../config/constants';

import ReactGA from 'react-ga';

class Form extends Component {
  static propTypes = {
    onGetFiles: PropTypes.func,
    channels: PropTypes.array,
    isLoggedIn: PropTypes.bool,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onDateChange: PropTypes.func,
    sortBySizeValue: PropTypes.string,
    sortByDateValue: PropTypes.string,
    sortBySizeValues: PropTypes.array,
    sortByDateValues: PropTypes.array,
    onSortBySizeValueChange: PropTypes.func,
    onSortByDateValueChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      types: INIT_TYPES_STATE,
      channel: '',
    };
  }

  getFiles = () => {
    const { types, channel } = this.state;
    const { startDate, endDate } = this.props;
    const fileTypes = Object.keys(types)
      .filter((type) => types[type] === true)
      .join(',');
    this.props.onGetFiles(startDate, endDate, fileTypes, channel);
  };

  updateDate = ({ startDate, endDate }) => {
    this.props.onDateChange({ startDate, endDate });

    /*G analytics*/
    ReactGA.event({
      category: 'date_updated',
      action: `startDate: ${startDate}, endDate: ${endDate}`
    });
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

    /*G analytics*/
    ReactGA.event({
      category: 'type_updated',
      action: `types: ${this.state.types}`
    });
  };

  handleChannelSelect = (value) => {

    this.setState({
      channel: value,
    });

    /*G analytics*/
    ReactGA.event({
      category: 'channel_updated',
      action: `channel: ${value}`
    });
  };

  handleSortByDateSelect = (value) => {
    this.props.onSortByDateValueChange(value);

    /*G analytics*/
    ReactGA.event({
      category: 'sort_by_date_updated',
      action: `date: ${value}`
    });
  };

  handleSortBySizeSelect = (value) => {
    this.props.onSortBySizeValueChange(value);

    /*G analytics*/
    ReactGA.event({
      category: 'sort_by_size_updated',
      action: `date: ${value}`
    });
  };

  renderChannelSelect = () => {
    const channels = this.props.channels;
    if (channels.length) {
      return (
        <div>
          <SelectComponent
            isChannel
            labelName={'Channels'}
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
        <CheckboxComponent
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

        <LabelComponent title={'Sort by'}/>

        <div className="Form__Field">
          <SelectComponent
            labelName={'Date'}
            options={this.props.sortByDateValues}
            value={this.props.sortByDateValue}
            onChange={this.handleSortByDateSelect}
          />
        </div>

        <div className="Form__Field">
          <SelectComponent
            emptyName={'None'}
            labelName={'Size'}
            options={this.props.sortBySizeValues}
            value={this.props.sortBySizeValue}
            onChange={this.handleSortBySizeSelect}
          />
        </div>

        <hr/>

        <LabelComponent title={'Filter by'}/>

        <div className="Form__Field">{this.renderChannelSelect()}</div>

        <div className="Form__Field">
          <LabelComponent title={'Date Range'}/>
          <DatePickerComponent
            onChange={this.updateDate}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
          />
        </div>

        <div className="Form__Field">
          <LabelComponent title={'Type of Files'}/>
          <CheckboxComponent
            checked={!typeSelected.length}
            onChange={this.updateType}
            value="all"
            label="All"
          />
          {this.renderTypeOptions()}
        </div>

        <ButtonComponent title={'Get files'} icon={'Folder'} disabled={!this.props.isLoggedIn} color={'primary'} onClick={this.getFiles}/>

      </div>
    );
  }
}

export default Form;
