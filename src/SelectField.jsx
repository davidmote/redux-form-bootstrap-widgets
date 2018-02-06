import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { castArray, map, get, head, isFunction } from 'lodash';

import { FormGroup, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';

import Label from 'Label';
import validationMessage from 'utils';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import './selectFieldStyle.css';

const propTypes = {
  /** Form label. */
  label: PropTypes.string.isRequired,
  /** Flag to display required Astrisk. */
  required: PropTypes.bool,
  /** Whether or not the field is disabled */
  disabled: PropTypes.bool,
  /** Allow multi select or single select */
  multiple: PropTypes.bool,
  /** Additional text that displays below the widget. */
  helpText: PropTypes.string,
  /** Custom validation function */
  customValidation: PropTypes.func,
  /** Either an array of objects that have a shape that includes
      the labelKey and valueKey, or a promise that resolves
      such an array */
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.object)],
  ).isRequired,
  /** The key that is used as the select label */
  labelKey: PropTypes.string,
  /** The key that is used as the select value */
  valueKey: PropTypes.string,
  /**
  * @ignore
  * Redux Form internal input property. Set when used in a redux 'Field'
  */
  input: PropTypes.object.isRequired,

  /**
  * @ignore
  * Redux Form internal meta property. Set when used in a redux 'Field'
  */
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  required: false,
  disabled: false,
  helpText: null,
  multiple: false,
  customValidation: undefined,
  labelKey: 'label',
  valueKey: 'value',
};

class SelectField extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    const { customValidation, meta } = props;

    if (customValidation) {
      this.state = customValidation(meta);
    } else {
      this.state = validationMessage(meta);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { customValidation, meta } = nextProps;
    if (customValidation) {
      this.setState(customValidation(meta));
    } else {
      this.setState(validationMessage(meta));
    }
  }

  selectProps = () => {
    const {
      multiple,
      labelKey,
      valueKey,
      input: { name, onChange, onFocus, onBlur, value, ...inputProps },
    } = this.props;

    return {
      name,
      value,
      labelKey,
      valueKey,
      autoBlur: true,
      onChange: this.handleChange,
      onFocus,
      onBlur: () => onBlur(),
      inputProps,
      multi: multiple,
      joinValues: true,
    };
  }

  handleChange = (selected) => {
    const { multiple, valueKey, input: { onChange } } = this.props;
    const selectedList = castArray(selected);
    const selectedVals = map(selectedList, opt => get(opt, valueKey));
    let changed;
    if (!multiple) {
      changed = get(head(selectedList), valueKey, null);
    } else {
      changed = selectedVals.length ? selectedVals : null;
    }
    onChange(changed);
  }

  renderHelpMessage = () => {
    const { helpText } = this.props;
    const errorMessage = this.state.errorMessage;
    return (<HelpBlock style={{ minHeight: helpText ? '6ex' : '3ex' }}>
      {errorMessage}
      {(errorMessage && helpText) ? <br /> : ''}
      {helpText}
    </HelpBlock>);
  }

  render() {
    const {
      label,
      required,
      helpText,
      multiple,
      labelKey,
      valueKey,
      customValidation,
      input: { name },
      meta,
      options,
      ...props
    } = this.props;

    const isAsync = isFunction(options);
    return (
      <FormGroup
        controlId={name}
        validationState={this.state.validationState}
      >
        <Label label={label} required={required} />
        {!isAsync ? (<Select
          {...this.selectProps()}
          options={options}
          {...props}
        />) : (<Select.Async
          {...this.selectProps()}
          loadOptions={options}
          {...props}
        />)
      }
        {this.renderHelpMessage()}
      </FormGroup>
    );
  }

}

export default SelectField;
