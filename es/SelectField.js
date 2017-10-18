'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactBootstrap = require('react-bootstrap');

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _utils = require('utils');

var _utils2 = _interopRequireDefault(_utils);

require('bootstrap/dist/css/bootstrap.css');

require('react-select/dist/react-select.css');

require('./selectFieldStyle.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SelectField = function SelectField(_ref) {
  var label = _ref.label,
      helpText = _ref.helpText,
      multiple = _ref.multiple,
      valueKey = _ref.valueKey,
      _ref$input = _ref.input,
      name = _ref$input.name,
      onChange = _ref$input.onChange,
      onFocus = _ref$input.onFocus,
      onBlur = _ref$input.onBlur,
      value = _ref$input.value,
      meta = _ref.meta,
      options = _ref.options,
      loadOptions = _ref.loadOptions,
      inputProps = _objectWithoutProperties(_ref.input, ['name', 'onChange', 'onFocus', 'onBlur', 'value']),
      props = _objectWithoutProperties(_ref, ['label', 'helpText', 'multiple', 'valueKey', 'input', 'meta', 'options', 'loadOptions']);

  var handleChange = function handleChange(selected) {
    var selectedList = _lodash2.default.castArray(selected);
    var selectedVals = _lodash2.default.map(selectedList, function (opt) {
      return _lodash2.default.get(opt, valueKey);
    });
    var changed = void 0;
    if (!multiple) {
      changed = _lodash2.default.get(_lodash2.default.head(selectedList), valueKey, null);
    } else {
      if (_lodash2.default.difference(value, selectedVals).length) {
        changed = _lodash2.default.intersection(value, selectedVals);
      } else {
        changed = _lodash2.default.union(value, selectedVals);
      }
      changed = changed.length ? changed : null;
    }
    onChange(changed);
  };

  var _validationMessage = (0, _utils2.default)(meta),
      validationState = _validationMessage.validationState,
      errorMessage = _validationMessage.errorMessage;

  return React.createElement(
    _reactBootstrap.FormGroup,
    {
      controlId: name,
      validationState: validationState
    },
    React.createElement(
      _reactBootstrap.ControlLabel,
      null,
      label
    ),
    options ? React.createElement(_reactSelect2.default, _extends({
      name: name,
      value: value,
      valueKey: valueKey,
      autoBlur: true,
      onChange: handleChange,
      onFocus: onFocus,
      onBlur: function () {
        return onBlur();
      },
      inputProps: inputProps,
      multi: !!multiple,
      joinValues: true,
      options: options
    }, props)) : React.createElement(_reactSelect2.default.Async, _extends({
      name: name,
      value: value,
      valueKey: valueKey,
      autoBlur: true,
      onChange: handleChange,
      onFocus: onFocus,
      onBlur: function () {
        return onBlur();
      },
      inputProps: inputProps,
      multi: !!multiple,
      joinValues: true,
      loadOptions: loadOptions
    }, props)),
    errorMessage,
    React.createElement(
      _reactBootstrap.HelpBlock,
      null,
      helpText
    )
  );
};

SelectField.propTypes = _extends({}, _reactSelect2.default.propTypes);
exports.default = SelectField;