import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import Service from './Service';
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

  renderServices() {
    const { services } = this.props;
    return services.valueSeq().map((service) => {
      return (<Service key={ service.id } service={ service } />);
    });
  }

  renderEditForm() {
    if (this.state.editing) {
      return (<ApplicationForm app={ this.props.app } />);
    }
    return null;
  }

  render() {
    const { app } = this.props;
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
        </div>
        <div>{ this.renderEditForm() }</div>
        <p>{ this.renderServices() }</p>
      </section>
    );
  }
}

export default Application;
