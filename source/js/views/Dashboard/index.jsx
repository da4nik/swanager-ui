import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


const mapStoreToProps = ({ apps }) => ({ apps });

@connect(mapStoreToProps)
export default class Dashboard extends Component {
  static propTypes = {
    apps: PropTypes.object,
  }

  renderApps() {
    const { apps } = this.props;
    return apps.map((app) => {
      return (<p key={ app.id }>{ app.name }</p>);
    });
  }

  render() {
    return (
      <div className='dashboard'>
        <h1>{'Dashboard'}</h1>
        { this.renderApps() }
      </div>
    );
  }
}
