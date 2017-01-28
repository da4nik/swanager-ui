import React from 'react';

class InputField extends React.Component {
  render () {
    let { title, inputType, onChange } = this.props;
    return (
      <div>
        <label name="email">
          { title }
          <input name="email" type={ inputType } onChange={ onChange } />
        </label>
      </div>
    )
  }
}

export default InputField;
