import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const mapStoreToProps = ({ logs }, { service }) => ({
  logs: (service.id in logs) ? logs[service.id] : [],
});

@connect(mapStoreToProps)
class ServiceLogs extends React.Component {
  static propTypes = {
    logs: PropTypes.array,
  }

  renderLogs() {
    const { logs } = this.props;

    const logLines = logs.map((line, index) => {
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
