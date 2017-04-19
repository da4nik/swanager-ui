import React, { PropTypes } from 'react';

import { guidGenerator } from '../../lib';

class EnvVarsForm extends React.Component {
  static blockClass = 'env-vars-form';

  static propTypes = {
    vars: PropTypes.array,
    onVarsChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const vars = {};

    vars[guidGenerator()] = { name: '', value: '' };

    if (props.vars && props.vars.length > 0) {
      props.vars.forEach((variable) => {
        vars[guidGenerator()] = variable;
      });
    }
    this.state = { vars };
  }

  onNameChange(event, key) {
    this.updateVariable(key, { name: event.target.value });
  }

  onValueChange(event, key) {
    this.updateVariable(key, { value: event.target.value });
  }

  elemClass(element) {
    return `${ EnvVarsForm.blockClass }__${ element }`;
  }

  updateVariable(key, elem) {
    const { vars } = this.state;
    this.state.vars[key] = Object.assign(vars[key], elem);
    this.props.onVarsChanged(this.varsToJSObject(this.state.vars));
    this.setState({ vars: this.state.vars });
  }

  varsToJSObject(vars) {
    return Object.values(vars).map((value) => value);
  }

  addNew() {
    const { vars } = this.state;
    vars[guidGenerator()] = { name: '', value: '' };
    this.setState({ vars });
  }

  renderEnvVars() {
    const { vars } = this.state;
    return Object.keys(vars).map((key) => {
      const variable = vars[key];
      return (
        <div className={ this.elemClass('input-group') } key={ key }>
          <input
            className={ this.elemClass('input') }
            type='text'
            onChange={ (event) => { this.onNameChange(event, key); } }
            defaultValue={ variable.name }
          />
          {' = '}
          <input
            className={ this.elemClass('input') }
            type='text'
            onChange={ (event) => { this.onValueChange(event, key); } }
            defaultValue={ variable.value }
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={ EnvVarsForm.blockClass }>
        { 'Environment variables' }
        <button onClick={ () => { this.addNew(); } }>Add</button>
        { this.renderEnvVars() }
      </div>
    );
  }
}

export default EnvVarsForm;
