import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { saveServ } from '../../actions/services';

const mapDispatchToProps = dispatch => ({
  saveService: (service) => { dispatch(saveServ(service)); },
});

@connect(null, mapDispatchToProps)
class ServiceForm extends React.Component {
  static propTypes = {
    app: PropTypes.object,
    service: PropTypes.object,
    saveService: PropTypes.func,
  }

  onSave() {
    const { service, app, saveService } = this.props;
    const updatedService = {
      application_id: service.application_id || app.id,
      name: this.nameInput.value,
      image: this.imageInput.value,
      replicas: parseInt(this.replicasInput.value, 10),
    };
    saveService(Object.assign({}, service, updatedService));
  }

  render() {
    const { service } = this.props;
    return (
      <div className='service-form'>
        <div className='service-form__title'>{'Service form'}</div>
        <label htmlFor='name' className='service-form__input'>
          {' Name: '}
          <input
            type='text'
            ref={ (input) => { this.nameInput = input; } }
            defaultValue={ service.name }
          />
        </label>

        <label htmlFor='image' className='service-form__input'>
          {' Image: '}
          <input
            type='text'
            ref={ (input) => { this.imageInput = input; } }
            defaultValue={ service.image }
          />
        </label>

        <label htmlFor='replicas' className='service-form__input'>
          {' Replicas: '}
          <input
            type='number'
            ref={ (input) => { this.replicasInput = input; } }
            defaultValue={ service.replicas }
          />
        </label>

        <button className='service-form__submit' onClick={ () => { this.onSave(); } }>Save</button>
      </div>
    );
  }
}

export default ServiceForm;
