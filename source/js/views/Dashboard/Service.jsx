import React, { PropTypes } from 'react';

import ServiceForm from './ServiceForm';
import ServiceStatus from './ServiceStatus';

class Service extends React.Component {
  static propTypes = {
    service: PropTypes.object,
    app: PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      editing: false,
    };
  }

  onEditClicked() {
    this.setState({ editing: !this.state.editing });
  }

  renderForm() {
    const { service, app } = this.props;
    if (this.state.editing) {
      return (
        <div className='service__form'>
          <ServiceForm service={ service } app={ app } />
        </div>
      );
    }
    return null;
  }

  renderStatus() {
    const { service } = this.props;
    return service.status ?
      service.status.map((status) => {
        return (<ServiceStatus key={ status.replica_id } status={ status } />);
      }) :
      null;
  }

  render() {
    const { service } = this.props;
    return (
      <section className='service'>
        <div className='service__title'>{ service.name }</div>
        <div className='service__description'>
          <ul>
            <li>Image: { service.image }</li>
            <li>URL for links: { service.ns_name }</li>
            <li>Replicas: { service.replicas }</li>
          </ul>
        </div>
        <div className='service_status'>
          { this.renderStatus() }
        </div>
        <button
          className='service__edit-button'
          onClick={ () => { this.onEditClicked(); } }
        >Edit</button>
        { this.renderForm() }
      </section>
    );
  }
}

export default Service;
