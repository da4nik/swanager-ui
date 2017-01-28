import React from 'react';

class InputField extends React.Component {
  static propTypes = {
    inputType: React.PropTypes.string,
    title: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
  }

  render() {
    const { title, inputType, onChange, value } = this.props;
    return (
      <div>
        <label htmlFor='email'>
          { title }
          <input name='email' type={ inputType } onChange={ onChange } value={ value } />
        </label>
      </div>
    );
  }
}

export default InputField;
