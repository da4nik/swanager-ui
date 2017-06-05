import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { guidGenerator } from '../../lib';

class VolumesForm extends Component {
  static blockClass = 'volumes-form';

  static propTypes = {
    volumes: PropTypes.array,
    onVolumesChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const volumes = {};

    volumes[guidGenerator()] = { app_wide: false, service: '', backend: '' };

    if (props.volumes && props.volumes.length > 0) {
      props.volumes.forEach((volume) => {
        volumes[guidGenerator()] = volume;
      });
    }
    this.state = { volumes };
  }

  onServiceChange(event, key) {
    this.updateVolume(key, { service: event.target.value });
  }

  onBackendChange(event, key) {
    this.updateVolume(key, { backend: event.target.value });
  }

  onAppWideChange(event, key) {
    this.updateVolume(key, { app_wide: event.target.value === 'yes' });
  }

  elemClass(element) {
    return `${ VolumesForm.blockClass }__${ element }`;
  }

  updateVolume(key, elem) {
    const { volumes } = this.state;
    volumes[key] = Object.assign(volumes[key], elem);
    this.props.onVolumesChanged(this.varsToJSObject(volumes));
    this.setState({ volumes });
  }

  varsToJSObject(volumes) {
    return Object.values(volumes).map((volume) => volume);
  }

  renderBackend(key) {
    const { volumes } = this.state;
    const volume = volumes[key];
    return volume.app_wide ? (<div>
      {' to app wide folder '}
      <input
        className={ this.elemClass('input') }
        type='text'
        onChange={ (event) => { this.onBackendChange(event, key); } }
        defaultValue={ volume.backend }
      />
    </div>) : null;
  }

  renderVolumes() {
    const { volumes } = this.state;
    return Object.keys(volumes).map((key) => {
      const volume = volumes[key];
      return (
        <div className={ this.elemClass('input-group') } key={ key }>
          <select
            className={ this.elemClass('select') }
            onChange={ (event) => { this.onAppWideChange(event, key); } }
            value={ volume.app_wide ? 'yes' : 'no' }
          >
            <option value='no'>Local</option>
            <option value='yes'>Application</option>
          </select>
          <input
            className={ this.elemClass('input') }
            type='text'
            onChange={ (event) => { this.onServiceChange(event, key); } }
            defaultValue={ volume.service }
          />
          { this.renderBackend(key) }
        </div>
      );
    });
  }

  render() {
    return (
      <div className={ VolumesForm.blockClass }>
        { 'Volumes' }
        { this.renderVolumes() }
      </div>
    );
  }
}

export default VolumesForm;
