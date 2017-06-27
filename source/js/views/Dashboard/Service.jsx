import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ServiceForm from './ServiceForm';
import ServiceStatus from './ServiceStatus';
import ServiceLogs from './ServiceLogs';
import { deleteService, applyServiceAction } from '../../actions/services';
import API from '../../api';

const mapDispatchToProps = (dispatch) => ({
  removeServ: (service) => { dispatch(deleteService(service)); },
  applyAction: (service, action) => { dispatch(applyServiceAction(service, action)); },
});

@connect(null, mapDispatchToProps)
class Service extends React.Component {
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
      showingLogs: false,
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

  toggleLogs() {
    const { showingLogs } = this.state;
    this.setState({ showingLogs: !showingLogs });
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
          return (<p key={ variable.name } className='service__detail_value'>{ variable.name } = { variable.value }</p>);
        }) : (<p className='service__detail_value'>None</p>);

      ports = service.published_ports.length > 0 ?
        service.published_ports.map((port) => {
          return (<p key={ port.external } className='service__detail_value'>[{ port.protocol }] { port.internal } {' => '} { port.external } { ', disabled: '} { port.disabled ? 'true' : 'false' }</p>);
        }) : (<p className='service__detail_value'>None</p>);

      volumes = service.volumes.length > 0 ?
        service.volumes.map((volume) => {
          return (
            <p key={ volume.service } className='service__detail_value'>{ volume.service }{ `-> ${ volume.backend }` }</p>
          );
        }) : (<p className='service__detail_value'>None</p>);
    }

    return (
      <div>
        <ul className='service__description'>
          <li>URL for links: { service.ns_name }</li>
          <li>Image: { service.image }</li>
          { service.command.length > 0 ? <li>Command: { service.command }</li> : null }
          <li>Replicas: { service.replicas }</li>
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
    const { showingLogs } = this.state;
    return (
      <section className='service'>
        <div className='service__title'>
          { service.name }
          <button
            className='service__button service__header-button'
            onClick={ () => { this.toggleLogs(); } }
          >logs</button>
        </div>
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
        { showingLogs ? <ServiceLogs service={ service } /> : null }
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
