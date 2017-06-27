import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadLogs } from '../../actions/services';

const mapStoreToProps = ({ logs }) => ({ logs });
const mapDispatchToProps = (dispatch) => ({
  requestLogs: (service) => { dispatch(loadLogs(service)); },
});

@connect(mapStoreToProps, mapDispatchToProps)
class ServiceLogs extends React.Component {
  static propTypes = {
    service: PropTypes.object.isRequired,
    logs: PropTypes.object,
    requestLogs: PropTypes.func,
  }

  // constructor(props) {
  //   super(props);
  //
  //   // props.requestLogs(props.service);
  // }

  componentWillMount() {
    this.props.requestLogs(this.props.service);
  }

  renderLogs() {
    const { logs, service } = this.props;

    if (!(service.id in logs)) { return null; }

    const logLines = logs[service.id].map((line, index) => {
      return (<p key={ index } className='service-logs__line'>{ line }</p>);
    });
    return (<div className='service-logs__container'>{ logLines }</div>);
  }

  render() {
    return (<div className='service-logs'>
      { 'Logs:' }
      { this.renderLogs() }
    </div>);
  }
}

export default ServiceLogs;
