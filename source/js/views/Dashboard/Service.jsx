import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ServiceForm from './ServiceForm';
import ServiceStatus from './ServiceStatus';
import { deleteService, applyServiceAction } from '../../actions/services';
import API from '../../api';

const mapDispatchToProps = (dispatch) => ({
  removeServ: (service) => { dispatch(deleteService(service)); },
  applyAction: (service, action) => { dispatch(applyServiceAction(service, action)); },
});

@connect(null, mapDispatchToProps)
class Service extends Component {
  static propTypes = {
    service: PropTypes.object,
    app: PropTypes.object,
    removeServ: PropTypes.func,
    applyAction: PropTypes.func,
  }

  constructor() {
    super();
    this.state = {
      editing: false,
      detailed: false,
    };
  }

  onEditClicked() {
    this.setState({ editing: !this.state.editing });
  }

  onRemove() {
    const { service, removeServ } = this.props;
    removeServ(service);
  }

  closeForm() {
    this.setState({ editing: false });
  }

  renderForm() {
    const { service, app } = this.props;
    if (this.state.editing) {
      return (
        <div className='service__form'>
          <ServiceForm service={ service } app={ app } closeForm={ () => { this.closeForm(); } } />
        </div>
      );
    }
    return null;
  }

  renderStatus() {
    const { service } = this.props;
    return service.status ?
      service.status.sort((a, b) => {
        if (a.timestamp > b.timestamp) { return -1; }
        if (a.timestamp < b.timestamp) { return 1; }
        return 0;
      }).map((status) => {
        return (<ServiceStatus key={ status.replica_id } status={ status } />);
      }) :
      null;
  }

  renderDescription() {
    const { detailed } = this.state;
    const { service } = this.props;
    let ports = null;
    let volumes = null;
    let variables = null;

    if (detailed) {
      variables = service.env.length > 0 ?
        service.env.map((variable) => {
          return (<p className='service__detail_value'>{ variable.name } = { variable.value }</p>);
        }) : (<p className='service__detail_value'>None</p>);

      ports = service.published_ports.length > 0 ?
        service.published_ports.map((port) => {
          return (<p className='service__detail_value'>[{ port.protocol }] { port.internal } {' => '} { port.external } { ', disabled: '} { port.disabled ? 'true' : 'false' }</p>);
        }) : (<p className='service__detail_value'>None</p>);

      volumes = service.volumes.length > 0 ?
        service.volumes.map((volume) => {
          return (
            <p className='service__detail_value'>{ volume.service }{ `-> ${ volume.backend }` }</p>
          );
        }) : (<p className='service__detail_value'>None</p>);
    }

    return (
      <div>
        <ul className='service__description'>
          <li className='service__description__value'>URL for links: { service.ns_name }</li>
          <li className='service__description__value'>Image: { service.image }</li>
          { service.command.length > 0 ? <li className='service__description__value'>Command: { service.command }</li> : null }
          <li className='service__description__value'>Replicas: { service.replicas }</li>
          {detailed ? (
            <div className='service__details'>
              <li>Variables: { variables }</li>
              <li>Ports: { ports }</li>
              <li>Volumes: { volumes }</li>
            </div>
          ) : (null)}
        </ul>
        <button
          className='service__details_trigger'
          onClick={ () => { this.setState({ detailed: !detailed }); } }
        >
          { detailed ? 'Show less' : 'Show more' }
        </button>
      </div>
    );
  }

  render() {
    const { service, applyAction } = this.props;
    return (
      <section className='service'>
        <div className='service__title'>{ service.name }</div>
        <div className='service__buttons'>
          <button
            className='service__button'
            onClick={ () => { if (confirm('Are you sure?')) { applyAction(service, API.serviceActions.START); } } }
          >Start</button>
          <button
            className='service__button'
            onClick={ () => { if (confirm('Are you sure?')) { applyAction(service, API.serviceActions.STOP); } } }
          >Stop</button>
          <button
            className='service__button'
            onClick={ () => { this.onEditClicked(); } }
          >Edit</button>
          <button
            className='service__button'
            onClick={ () => { if (confirm('Are you sure?')) { this.onRemove(); } } }
          >Remove</button>
        </div>
        { this.renderForm() }
        { this.renderDescription() }
        <div className='service_status'>
          <div className='service_status__title'>Status:</div>
          { this.renderStatus() }
        </div>
      </section>
    );
  }
}

export default Service;
