import React, { PropTypes } from 'react';

import { guidGenerator } from '../../lib';

class PublishedPortsForm extends React.Component {
  static blockClass = 'pub-ports-form';

  static propTypes = {
    ports: PropTypes.array,
    onPortsChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const ports = {};

    ports[guidGenerator()] = {
      internal: 0,
      external: 0,
      protocol: 'tcp',
      disabled: false,
    };

    if (props.ports && props.ports.length > 0) {
      props.ports.forEach((port) => {
        ports[guidGenerator()] = port;
      });
    }
    this.state = { ports };
  }

  onInternalChange(event, key) {
    this.updatePort(key, { internal: parseInt(event.target.value, 10) });
  }

  onExternalChange(event, key) {
    this.updatePort(key, { external: parseInt(event.target.value, 10) });
  }

  onProtocolChange(event, key) {
    this.updatePort(key, { protocol: event.target.value });
  }

  onDisabledChange(event, key) {
    this.updatePort(key, { disabled: event.target.checked });
  }

  elemClass(element) {
    return `${ PublishedPortsForm.blockClass }__${ element }`;
  }

  updatePort(key, elem) {
    const { ports } = this.state;
    ports[key] = Object.assign(ports[key], elem);
    this.props.onPortsChanged(this.varsToJSObject(ports));
    this.setState({ ports });
  }

  varsToJSObject(ports) {
    return Object.values(ports).map((port) => port);
  }

  renderPorts() {
    const { ports } = this.state;
    return Object.keys(ports).map((key) => {
      const port = ports[key];
      return (
        <div className={ this.elemClass('input-group') } key={ key }>
          {' Internal Port '}
          <input
            className={ this.elemClass('input') }
            type='number'
            onChange={ (event) => { this.onInternalChange(event, key); } }
            defaultValue={ port.internal }
          />

          {' to External Port '}
          <input
            className={ this.elemClass('input') }
            type='number'
            onChange={ (event) => { this.onExternalChange(event, key); } }
            defaultValue={ port.external }
          />

          <select
            className={ this.elemClass('select') }
            onChange={ (event) => { this.onProtocolChange(event, key); } }
          >
            <option value='tcp'>tcp</option>
            <option value='udp'>udp</option>
          </select>

          {' disabled '}
          <input
            className={ this.elemClass('input') }
            type='checkbox'
            onChange={ (event) => { this.onDisabledChange(event, key); } }
            checked={ port.disabled }
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={ PublishedPortsForm.blockClass }>
        { 'Published ports' }
        { this.renderPorts() }
      </div>
    );
  }
}

export default PublishedPortsForm;
