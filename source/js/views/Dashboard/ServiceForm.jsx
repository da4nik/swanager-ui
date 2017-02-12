import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { saveService } from '../../actions/services';

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

  onSave() {
    const { service, app, saveServ, closeForm } = this.props;
    const updatedService = {
      application_id: service.application_id || app.id,
      name: this.nameInput.value,
      image: this.imageInput.value,
      replicas: parseInt(this.replicasInput.value, 10),
    };
    saveServ(Object.assign({}, service, updatedService));
    closeForm();
  }

  render() {
    const { service } = this.props;
    return (
      <div className='service-form'>
        <div className='service-form__title'>{'Service form'}</div>
        <label htmlFor='name' className='service-form__label'>
          {' Name: '}
          <input
            className='service-form__input'
            type='text'
            ref={ (input) => { this.nameInput = input; } }
            defaultValue={ service.name }
          />
        </label>

        <label htmlFor='image' className='service-form__label'>
          {' Image: '}
          <input
            className='service-form__input'
            type='text'
            ref={ (input) => { this.imageInput = input; } }
            defaultValue={ service.image }
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

        <button className='service-form__submit' onClick={ () => { this.onSave(); } }>Save</button>
      </div>
    );
  }
}

export default ServiceForm;
