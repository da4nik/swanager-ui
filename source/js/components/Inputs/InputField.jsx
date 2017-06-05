import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputField extends Component {
  static propTypes = {
    inputType: PropTypes.string,
    title: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    inputClass: PropTypes.string,
  }

  render() {
    const { title, inputType, onChange, value, placeholder, inputClass } = this.props;
    return (
      <div>
        <label htmlFor='email'>
          { title }
          <input className={ inputClass } name='email' type={ inputType } onChange={ onChange } value={ value } placeholder={ placeholder } />
        </label>
      </div>
    );
  }
}

export default InputField;
