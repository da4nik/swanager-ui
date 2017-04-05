import React from 'react';

class InputField extends React.Component {
  static propTypes = {
    inputType: React.PropTypes.string,
    title: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    inputClass: React.PropTypes.string,
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
