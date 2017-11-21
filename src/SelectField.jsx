import React from 'react';
import _ from 'lodash';

import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import validationMessage from 'utils';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import './selectFieldStyle.css';

const SelectField = ({
  label,
  helpText,
  multiple,
  valueKey,
  customValidation,
  input: { name, onChange, onFocus, onBlur, value, ...inputProps },
  meta,
  options,
  loadOptions,
  ...props
}) => {
  const selectValueKey = valueKey || 'value';

  const handleChange = (selected) => {
    const selectedList = _.castArray(selected);
    const selectedVals = _.map(selectedList, opt => _.get(opt, selectValueKey));
    let changed;
    if (!multiple) {
      changed = _.get(_.head(selectedList), selectValueKey, null);
    } else {
      changed = selectedVals.length ? selectedVals : null;
    }
    onChange(changed);
  };


  const { validationState, errorMessage } = customValidation ?
  customValidation(meta) :
  validationMessage(meta);

  return (
    <FormGroup
      controlId={name}
      validationState={validationState}
    >
      {label ? <ControlLabel>{label}</ControlLabel> : ''}
      {options ? (<Select
        name={name}
        value={value}
        valueKey={selectValueKey}
        autoBlur
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={() => onBlur()}
        inputProps={inputProps}
        multi={!!multiple}
        joinValues
        options={options}
        {...props}
      />) : (<Select.Async
        name={name}
        value={value}
        valueKey={selectValueKey}
        autoBlur
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={() => onBlur()}
        inputProps={inputProps}
        multi={!!multiple}
        joinValues
        loadOptions={loadOptions}
        {...props}
      />)
    }
      {errorMessage}
      <HelpBlock>{helpText}</HelpBlock>
    </FormGroup>
  );
};


SelectField.propTypes = {
  ...Select.propTypes,
};
export default SelectField;
