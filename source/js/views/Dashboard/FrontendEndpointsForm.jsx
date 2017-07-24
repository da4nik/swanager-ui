import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { guidGenerator } from '../../lib';

class FrontendEndpointsFrom extends Component {
  static blockClass = 'frontent-endpoints-form';

  static propTypes = {
    frontends: PropTypes.array,
    internalPortHint: PropTypes.array,
    onFrontendsChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    let frontends = {};

    frontends = this.addEmptyFrontend(frontends);

    if (props.frontends && props.frontends.length > 0) {
      props.frontends.forEach((frontend) => {
        frontends[guidGenerator()] = frontend;
      });
    }
    this.state = { frontends };
  }

  onInternalChange(event, key) {
    this.updateFrontend(key, { internal_port: parseInt(event.target.value, 10) });
  }

  onExternalChange(event, key) {
    this.updateFrontend(key, { external_port: parseInt(event.target.value, 10) });
  }

  onDomainChange(event, key) {
    this.updateFrontend(key, { domain: event.target.value });
  }

  onDisabledChange(event, key) {
    this.updateFrontend(key, { disabled: event.target.checked });
  }

  elemClass(element) {
    return `${ FrontendEndpointsFrom.blockClass }__${ element }`;
  }

  updateFrontend(key, elem) {
    const { frontends } = this.state;
    frontends[key] = Object.assign(frontends[key], elem);
    this.props.onFrontendsChanged(this.varsToJSObject(frontends));
    this.setState({ frontends });
  }

  varsToJSObject(hash) {
    return Object.values(hash).map((elem) => elem);
  }

  addEmptyFrontend(frontends) {
    const newFrontends = frontends;
    newFrontends[guidGenerator()] = {
      domain: '',
      internal_port: this.props.internalPortHint[0],
      external_port: 0,
      disabled: false,
    };
    return newFrontends;
  }

  addNew() {
    const { frontends } = this.state;
    this.setState({ frontends: this.addEmptyFrontend(frontends) });
  }

  renderInternalPortInput(key, frontend) {
    const { internalPortHint } = this.props;
    const options = internalPortHint.map((port, index) => {
      return (
        <option
          key={ index }
          selected={ port === frontend.internal_port }
          value={ port }
        >
          { port }
        </option>
      );
    });

    return (<div>
      {' Internal Port '}
      <select
        className={ this.elemClass('input') }
        onChange={ (event) => { this.onInternalChange(event, key); } }
      >
        { options }
      </select>
    </div>);
  }

  renderFrontends() {
    const { frontends } = this.state;
    return Object.keys(frontends).map((key) => {
      const frontend = frontends[key];
      return (
        <div className={ this.elemClass('input-group') } key={ key }>
          {' Domain '}
          <input
            className={ this.elemClass('input') }
            type='text'
            onChange={ (event) => { this.onDomainChange(event, key); } }
            defaultValue={ frontend.domain }
          />

          { this.renderInternalPortInput(key, frontend) }

          {' to External Port '}
          <input
            className={ this.elemClass('input') }
            type='number'
            onChange={ (event) => { this.onExternalChange(event, key); } }
            defaultValue={ frontend.external_port }
          />

          {' disabled '}
          <input
            className={ this.elemClass('input') }
            type='checkbox'
            onChange={ (event) => { this.onDisabledChange(event, key); } }
            checked={ frontend.disabled }
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={ FrontendEndpointsFrom.blockClass }>
        { 'Frontend endpoints' }
        <button onClick={ () => { this.addNew(); } }>Add</button>
        { this.renderFrontends() }
      </div>
    );
  }

}

export default FrontendEndpointsFrom;
