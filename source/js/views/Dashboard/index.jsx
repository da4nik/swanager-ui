import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadApps } from '../../actions/apps';
import { loadServices } from '../../actions/services';


const mapStoreToProps = ({ apps }) => ({ apps });
const mapDispatchToProps = dispatch => ({
  loadApplications: () => { dispatch(loadApps()); },
  loadServices: () => { dispatch(loadServices()); },
});

@connect(mapStoreToProps, mapDispatchToProps)
export default class Dashboard extends Component {
  static propTypes = {
    apps: PropTypes.object,
    loadApplications: PropTypes.func,
    loadServices: PropTypes.func,
  }

  componentWillMount() {
    this.props.loadApplications();
    this.props.loadServices();
  }

  renderApps() {
    const { apps } = this.props;
    return apps.valueSeq().map((app) => {
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
