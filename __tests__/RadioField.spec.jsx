/* eslint-disable import/first */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { RadioField } from 'index';

const fieldProps = {
  input: {
    name: 'fieldName',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    onFocus: jest.fn(),
  },
  meta: {
    form: 'formName',
    pristine: false,
  },
  label: 'Radio Test',
  options: [
    { label: 'Option 1', value: 'One' },
    { label: 'Option 2', value: 'Two' },
    { label: 'Option 3', value: 'Three' },
  ],
};

const selectedFieldProps = { ...fieldProps };
selectedFieldProps.input = { ...fieldProps.input };
selectedFieldProps.input.value = 'One';

const customOptionFieldProps = { ...fieldProps };
customOptionFieldProps.labelKey = 'foo';
customOptionFieldProps.valueKey = 'bar';
customOptionFieldProps.options = [
  { foo: 'Option 1', bar: 'One' },
  { foo: 'Option 2', bar: 'Two' },
  { foo: 'Option 3', bar: 'Three' }];

describe('The Radio Field', () => {
  let inputWrapper;

  beforeEach(() => {
    inputWrapper = mount(<RadioField {...fieldProps} />);
  });

  it('renders', () => {
    const shallowField = shallow(<RadioField {...fieldProps} />);
    expect(shallowField).toMatchSnapshot();
  });

  it('has a label when there is a label', () => {
    expect(inputWrapper.find('ControlLabel').text()).toEqual(fieldProps.label);
  });

  it('renders with custom options', () => {
    inputWrapper = mount(<RadioField {...customOptionFieldProps} />);
    expect(inputWrapper).toMatchSnapshot();
  });
  it('triggers the focus when focused', () => {
    inputWrapper.find('input[value="One"]').simulate('focus');
    expect(fieldProps.input.onFocus).toHaveBeenCalledTimes(1);
  });

  it('triggers the blur when blurred', () => {
    inputWrapper.find('input[value="One"]').simulate('blur');
    expect(fieldProps.input.onBlur).toHaveBeenCalledTimes(1);
  });
  it('calls onChange when the radio is selected', () => {
    inputWrapper.find('input[value="One"]').simulate('change', { target: { value: 'One' } });
    expect(fieldProps.input.onChange).toHaveBeenCalledTimes(1);
    expect(fieldProps.input.onBlur).toHaveBeenCalledTimes(1);
    expect(fieldProps.input.onChange).toHaveBeenCalledWith('One');
  });

  it('clears value  when the radio is deselected', () => {
    inputWrapper = mount(<RadioField {...selectedFieldProps} />);
    inputWrapper.find('input[value="One"]').simulate('change', { target: { value: 'One' } });
    expect(fieldProps.input.onChange).toHaveBeenCalledTimes(1);
    expect(fieldProps.input.onChange).toHaveBeenCalledWith(null);
  });

  it('calls custom validator when the toogle is toggled', () => {
    const customValidator = jest.fn(() => ({ validationState: null, errorMessage: null }));
    const validatorProps = { ...fieldProps, validator: customValidator };
    const inputWrapperValidated = mount(<RadioField {...validatorProps} />);

    inputWrapperValidated.find('input[value="One"]').simulate('change', { target: { value: 'One' } });
    expect(customValidator).toHaveBeenCalledTimes(1);
  });

  it('uses a custom validator when new props are added', () => {
    const customValidator = jest.fn(() => ({ validationState: null, errorMessage: null }));
    const customProps = { ...fieldProps, validator: customValidator };
    inputWrapper = shallow(<RadioField {...customProps} />);
    expect(customValidator).toHaveBeenCalledTimes(1); // Constructor
    inputWrapper.setProps({ label: 'new Label' });
    expect(customValidator).toHaveBeenCalledTimes(2); // On Prop Change
  });

  it('renders the help message with a break', () => {
    const customValidator = jest.fn(() => ({ validationState: null, errorMessage: 'There was an error' }));
    const customProps = { ...fieldProps, helpText: 'The help Text', helpTextStyle: { fontWeight: 'bold' }, validator: customValidator };
    inputWrapper = shallow(<RadioField {...customProps} />);
    expect(inputWrapper).toMatchSnapshot();
  });
});
