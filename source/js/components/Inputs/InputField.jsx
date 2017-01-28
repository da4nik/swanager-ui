import React from 'react';

class InputField extends React.Component {
  render() {
    const { title, inputType, onChange } = this.props;
    return (
      <div>
        <label htmlFor='email'>
          { title }
          <input name='email' type={ inputType } onChange={ onChange } />
        </label>
      </div>
    );
  }
}

InputField.propTypes = {
  inputType: React.PropTypes.string,
  title: React.PropTypes.string,
  onChange: React.PropTypes.func,
};


export default InputField;
