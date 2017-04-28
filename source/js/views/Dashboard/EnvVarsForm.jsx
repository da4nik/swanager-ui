import React, { PropTypes } from 'react';

import { guidGenerator } from '../../lib';

class EnvVarsForm extends React.Component {
  static blockClass = 'env-vars-form';

  static propTypes = {
    vars: PropTypes.array,
    onVarsChanged: PropTypes.func.isRequired,
    nsName: PropTypes.string,
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
    this.state = { 
      vars,
      nsNames: props.nsName,
    };
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

  onShowHintsClick(event, key) {
    console.log('Hint Clicked');
    console.log(event);
    console.log(key);
  }

  renderEnvVars() {
    const { vars, nsNames } = this.state;
    console.log(nsNames);
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
          <div className="showHints">
            <span className="showHints__circle" onClick={(event) => { this.onShowHintsClick(event, key); }}></span>
            <div className="hintsWrap">
              {
                <div className="hintsWrap__hint">{ nsNames }</div>
              }
            </div>
          </div>
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
