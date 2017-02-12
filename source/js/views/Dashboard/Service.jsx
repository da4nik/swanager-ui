import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ServiceForm from './ServiceForm';
import ServiceStatus from './ServiceStatus';
import { deleteService } from '../../actions/services';

const mapDispatchToProps = (dispatch) => ({
  removeServ: (service) => { dispatch(deleteService(service)); },
});

@connect(null, mapDispatchToProps)
class Service extends React.Component {
  static propTypes = {
    service: PropTypes.object,
    app: PropTypes.object,
    removeServ: PropTypes.func,
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
        <div className='service__buttons'>
          <button
            className='service__button'
            onClick={ () => { this.onEditClicked(); } }
          >Edit</button>
          <button
            className='service__button'
            onClick={ () => { this.onRemove(); } }
          >Remove</button>
        </div>
        { this.renderForm() }
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
      </section>
    );
  }
}

export default Service;
