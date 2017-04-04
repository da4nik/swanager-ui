import React from 'react';

class InputField extends React.Component {
  static propTypes = {
    inputType: React.PropTypes.string,
    title: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
  }

  render() {
    const { title, inputType, onChange, value, placeholder, className } = this.props;
    return (
      <div>
        <label htmlFor='email'>
          { title }
          <input className={ className } name='email' type={ inputType } onChange={ onChange } value={ value } placeholder={ placeholder } />
        </label>
      </div>
    );
  }
}

export default InputField;
