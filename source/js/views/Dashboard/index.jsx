import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadApplications } from '../../actions/apps';
import Applications from './Applications';
import SignOut from '../../components/Global/SignOut';


const mapStoreToProps = ({ apps }) => ({ apps });
const mapDispatchToProps = dispatch => ({
  loadApplications: () => { dispatch(loadApplications()); },
});

@connect(mapStoreToProps, mapDispatchToProps)
export default class Dashboard extends Component {
  static propTypes = {
    apps: PropTypes.object,
    loadApplications: PropTypes.func,
  }

  componentWillMount() {
    this.props.loadApplications();
  }

  renderApps() {
    const { apps } = this.props;
    return apps.valueSeq().map((app) => {
      return (<p key={ app.id }>{ app.name }</p>);
    });
  }

  render() {
    return (
      <div className='container dashboard'>
        <h1>{'Dashboard'}</h1>
        <SignOut />
        <Applications apps={ this.props.apps } />
      </div>
    );
  }
}
