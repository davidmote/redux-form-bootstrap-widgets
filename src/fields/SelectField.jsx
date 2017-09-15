import React, { Component } from 'react';
import { FormGroup, ControlLabel, HelpBlock, InputGroup } from 'react-bootstrap';

import _ from 'lodash';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectField extends Component {

  state = { selected: undefined }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ selected: _.get(nextProps, 'input.value', null) });
  }

  handleBlur = (event) => {
    this.props.input.onBlur(this.state.selected);
  }

  handleChange = (option) => {
    const value = _.get(option, this.props.valueKey, null);
    this.setState({ selected: value });
    this.props.input.onChange(value);
  }
  render() {
    const {
      options,
      labelKey,
      valueKey,
      label,
      helpText,
      input: { name, onChange, onFocus, onBlur, ...inputProps },
      meta: { touched, error, warning },
      ...props
    } = this.props;
    const { value } = inputProps;
    let errorMessage;
    let validationState;
    if (touched && !error && !warning) {
      validationState = 'success';
    } else if (touched) {
      if (error) {
        validationState = 'error';
      } else {
        validationState = 'warning';
      }
      errorMessage = (<HelpBlock>{error || warning}</HelpBlock>);
    }
    return (
      <FormGroup
        controlId={name}
        validationState={validationState}
      >
        <ControlLabel>{label}</ControlLabel>

        <Select
          inputProps={inputProps}
          value={value}
          autoBlur
          onChange={this.handleChange}
          name={name}
          options={options}
          labelKey={labelKey}
          valueKey={valueKey}
          onFocus={onFocus}
          onBlur={this.handleBlur}
          {...props}
        />
        {errorMessage}
        <HelpBlock>{helpText}</HelpBlock>
      </FormGroup>
    );
  }
}

export default SelectField;
