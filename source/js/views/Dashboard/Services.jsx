import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import Service from './Service';
import ServiceForm from './ServiceForm';

class Services extends Component {
  static propTypes = {
    services: PropTypes.instanceOf(Immutable.Map),
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

  closeForm() {
    this.setState({ editing: false });
  }

  renderServices() {
    const { services, app } = this.props;

    const renderedServices = services.valueSeq()
      .filter(service => service.application_id === app.id)
      .map((service) => {
        return (<Service key={ service.id } service={ service } app={ app } />);
      }).toJS();

    if (renderedServices.length === 0) {
      return (<p className='services__no-services'>No services yet, you can add one :)</p>);
    }
    return renderedServices;
  }

  renderServiceForm() {
    if (this.state.editing) {
      return (
        <ServiceForm
          service={ {} }
          app={ this.props.app }
          closeForm={ () => { this.closeForm(); } }
        />
      );
    }
    return null;
  }

  render() {
    return (
      <section className='services'>
        <div className='services__title'>{ 'Services' }</div>
        <div className='services__buttons'>
          <button
            className='services__button'
            onClick={ () => { this.onEditClicked(); } }
          >Add new</button>
        </div>
        { this.renderServiceForm() }
        { this.renderServices() }
      </section>
    );
  }
}

export default Services;
