import React, { PropTypes } from 'react';
import Moment from 'moment';

const ServiceStatus = ({ status }) => {
  let timing = `(${ Moment(status.timestamp).fromNow() })`;
  let node = `[${ status.node }]`;

  if (status.status === 'not_exists') {
    timing = null;
    node = null;
  }

  return (
    <div>
      <p>{ node } { status.status } { timing } </p>

    </div>
  );
};

ServiceStatus.propTypes = {
  status: PropTypes.object,
};

export default ServiceStatus;
