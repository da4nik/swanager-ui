import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import Services from './Services';
import ApplicationForm from './ApplicationForm';

const mapStoreToProps = ({ services }) => ({ services });

@connect(mapStoreToProps)
class Application extends React.Component {
  static propTypes = {
    app: PropTypes.object,
    services: PropTypes.instanceOf(Immutable.Map),
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

  renderEditForm() {
    if (this.state.editing) {
      return (
        <div className='application__form'>
          <ApplicationForm app={ this.props.app } />
        </div>
      );
    }
    return null;
  }

  render() {
    const { app, services } = this.props;
    return (
      <section className='application'>
        <div className='application__title'>{ app.name }</div>
        <div className='application__buttons-container'>
          <button className='application__button'>Start</button>
          <button className='application__button'>Stop</button>
          <button
            className='application__button application__button_left-spaced'
            onClick={ () => { this.onEditClicked(); } }
          >Edit</button>
          <button className='application__button'>Remove</button>
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
