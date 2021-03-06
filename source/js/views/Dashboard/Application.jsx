import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import Services from './Services';
import ApplicationForm from './ApplicationForm';
import { applyAppAction, destroyApplication } from '../../actions/apps';
import API from '../../api';

const mapStoreToProps = ({ services }) => ({ services });

const mapDispatchToProps = dispatch => ({
  applyAction: (app, action) => { dispatch(applyAppAction(app, action)); },
  destroyApp: (app) => { dispatch(destroyApplication(app)); },
});

@connect(mapStoreToProps, mapDispatchToProps)
class Application extends Component {
  static propTypes = {
    app: PropTypes.object,
    services: PropTypes.instanceOf(Immutable.Map),
    destroyApp: PropTypes.func,
    applyAction: PropTypes.func,
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

  renderEditForm() {
    if (this.state.editing) {
      return (
        <div className='application__form'>
          <ApplicationForm app={ this.props.app } closeForm={ () => { this.closeForm(); } } />
        </div>
      );
    }
    return null;
  }

  render() {
    const { app, services, applyAction, destroyApp } = this.props;
    return (
      <section className='application'>
        <div className='application__title'>{ app.name }</div>
        <div className='application__buttons-container'>
          <button
            className='application__button'
            onClick={ () => { if (confirm('Are you sure?')) { applyAction(app, API.appActions.START); } } }
          >Start</button>
          <button
            className='application__button'
            onClick={ () => { if (confirm('Are you sure?')) { applyAction(app, API.appActions.STOP); } } }
          >Stop</button>
          <button
            className='application__button application__button_left-spaced'
            onClick={ () => { this.onEditClicked(); } }
          >Edit</button>
          <button
            className='application__button'
            onClick={ () => { if (confirm('Are you sure?')) { destroyApp(app); } } }
          >Remove</button>
        </div>
        { this.renderEditForm() }
        <div className='application__services'>
          <Services services={ services } app={ app } />
        </div>
      </section>
    );
  }
}

export default Application;
