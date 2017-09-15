import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { guidGenerator } from '../../lib';
import Hints from '../../components/Hints/hints';

class EnvVarsForm extends Component {
  static blockClass = 'env-vars-form';

  static propTypes = {
    vars: PropTypes.array,
    appID: PropTypes.string,
    onVarsChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const vars = {};

    vars[guidGenerator()] = { name: '', value: '', showHints: false };

    if (props.vars && props.vars.length > 0) {
      props.vars.forEach((variable) => {
        vars[guidGenerator()] = variable;
      });
    }
    this.state = {
      vars,
      variableCanUpdate: false
    };
  }

  componentDidMount() {
    this.setState({ variableCanUpdate: true });
  }

  componentWillUnmount () {
    this.setState({ variableCanUpdate: false });
  }

  onNameChange(event, key) {
    this.updateVariable(key, { name: event.target.value });
  }

  onValueChange(event, key) {
    this.updateVariable(key, { value: event.target.value });
  }

  onCloseHintsClick() {
    const { vars } = this.state;

    Object.keys(vars).map((variable) => {
      this.updateVariable(variable, { showHints: false });
      return false;
    });
  }

  onShowHintsClick(key) {
    const { vars } = this.state;
    const currentHintState = vars[key].showHints;
    Object.keys(vars).map((variable) => {
      if (variable !== key) {
        this.updateVariable(variable, { showHints: false });
      } else {
        this.updateVariable(key, { showHints: !currentHintState });
      }
      return false;
    });
  }

  onHintSelect(nsName, key) {
    this.updateVariable(key, { value: nsName });
    this.updateVariable(key, { showHints: false });
  }

  addNew() {
    const { vars } = this.state;
    vars[guidGenerator()] = { name: '', value: '', showHints: false };
    this.setState({ vars });
  }

  varsToJSObject(vars) {
    return Object.values(vars).map((value) => value);
  }

  updateVariable(key, elem) {
    const { vars, variableCanUpdate } = this.state;
    if (variableCanUpdate){
      this.state.vars[key] = Object.assign(vars[key], elem);
      this.props.onVarsChanged(this.varsToJSObject(this.state.vars));
      this.setState({ vars: this.state.vars });
    }
  }

  elemClass(element) {
    return `${ EnvVarsForm.blockClass }__${ element }`;
  }

  renderEnvVars() {
    const { vars } = this.state;
    const { appID } = this.props;
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
            value={ variable.value }
          />
          <Hints
            Hintskey={ key }
            showHints={ variable.showHints }
            appID={ appID }
            onShowHints={ (Hintskey) => { this.onShowHintsClick(Hintskey); } }
            onHintSelect={ (nsName, Hintskey) => { this.onHintSelect(nsName, Hintskey); } }
            onCloseHints={ () => { this.onCloseHintsClick(); } }
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
