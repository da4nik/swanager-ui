import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { saveService } from '../../actions/services';
import EnvVarsForm from './EnvVarsForm';
import PublishedPortsForm from './PublishedPortsForm';
import VolumesForm from './VolumesForm';

const mapDispatchToProps = dispatch => ({
  saveServ: (service) => { dispatch(saveService(service)); },
});

@connect(null, mapDispatchToProps)
class ServiceForm extends React.Component {
  static propTypes = {
    app: PropTypes.object,
    service: PropTypes.object,
    saveServ: PropTypes.func,
    closeForm: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      vars: props.service.env,
      ports: props.service.published_ports,
      volumes: props.service.volumes,
      serviceHasChanges: false,
    };
  }

  onSave() {
    const { service, app, saveServ, closeForm } = this.props;
    const { vars, ports, volumes } = this.state;
    const updatedService = {
      application_id: service.application_id || app.id,
      name: this.nameInput.value,
      image: this.imageInput.value,
      command: this.commandInput.value,
      replicas: parseInt(this.replicasInput.value, 10),
      env: vars,
      published_ports: ports,
      volumes,
    };
    saveServ(Object.assign({}, service, updatedService));
    this.setState({ serviceHasChanges: false });
    closeForm();
  }

  onVarsChanged(vars) {
    this.setState({ vars, serviceHasChanges: true });
  }

  onPortsChanged(ports) {
    this.setState({ ports, serviceHasChanges: true });
  }

  onVolumesChanged(volumes) {
    this.setState({ volumes, serviceHasChanges: true });
  }

  onInputChange(event) {
    this.setState({ serviceHasChanges: true });
  }

  render() {
    const { service, app } = this.props;
    return (
      <div className='service-form'>
        <div className='service-form__title'>{'Service form'}</div>
        <label htmlFor='name' className='service-form__label'>
          {' Name: '}
          <input
            className='service-form__input'
            type='text'
            ref={ (input) => { this.nameInput = input; } }
            onChange={ (event) => { this.onInputChange(event); } }
            defaultValue={ service.name }
          />
        </label>

        <label htmlFor='image' className='service-form__label'>
          {' Image: '}
          <input
            className='service-form__input'
            type='text'
            ref={ (input) => { this.imageInput = input; } }
            onChange={ (event) => { this.onInputChange(event); } }
            defaultValue={ service.image }
          />
        </label>

        <label htmlFor='command' className='service-form__label'>
          {' Command: '}
          <input
            className='service-form__input'
            type='text'
            ref={ (input) => { this.commandInput = input; } }
            onChange={ (event) => { this.onInputChange(event); } }
            defaultValue={ service.command }
          />
        </label>

        <label htmlFor='replicas' className='service-form__label'>
          {' Replicas: '}
          <select
            className='service-form__input'
            ref={ (input) => { this.replicasInput = input; } }
            defaultValue={ service.replicas }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </label>

        <EnvVarsForm
          vars={ this.state.vars }
          appID={ app.id }
          onVarsChanged={ (vars) => { this.onVarsChanged(vars); } }
        />

        <PublishedPortsForm
          ports={ this.state.ports }
          onPortsChanged={ (ports) => { this.onPortsChanged(ports); } }
        />

        <VolumesForm
          volumes={ this.state.volumes }
          onVolumesChanged={ (volumes) => { this.onVolumesChanged(volumes); } }
        />

        <button className='service-form__submit' disabled={!this.state.serviceHasChanges} onClick={ () => { this.onSave(); } }>Save</button>
      </div>
    );
  }
}

export default ServiceForm;
