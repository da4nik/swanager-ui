import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import Application from './Application';
import ApplicationForm from './ApplicationForm';

class Applications extends Component {
  static propTypes = {
    apps: PropTypes.instanceOf(Immutable.Map),
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

  renderApps() {
    const { apps } = this.props;

    return apps.valueSeq().map((app) => {
      return <Application key={ app.id } app={ app } />;
    });
  }

  renderEditForm() {
    if (this.state.editing) {
      return (<ApplicationForm app={ {} } closeForm={ () => { this.closeForm(); } } />);
    }
    return null;
  }

  render() {
    return (
      <section className='applications'>
        <h2>Applications</h2>
        <button
          className='applications__create-button'
          onClick={ () => { this.onEditClicked(); } }
        >New Application</button>
        { this.renderEditForm() }
        <div className='applications__apps-list'>{ this.renderApps() }</div>
      </section>
    );
  }
}

export default Applications;
