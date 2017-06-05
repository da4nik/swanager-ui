import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

const ServiceStatus = ({ status }) => {
  let timing = `(${ Moment(status.timestamp).fromNow() })`;
  let htmlClass = 'service_status__task ';
  let error = null;

  if (status.error.length !== 0) {
    htmlClass += 'service_status__task_with-error';
    error = <p className='service_status__error'>{ status.error }</p>;
  }

  // timestamp and timings
  let statusTime = null;
  if (status.status === 'not_exists') {
    timing = null;
  } else {
    const dateTime = new Date(status.timestamp);
    const leadingZero = (number) => {
      return number < 10 ? `0${ number }` : number;
    };

    statusTime = `${ leadingZero(dateTime.getHours()) }:${ leadingZero(dateTime.getMinutes()) }:${ leadingZero(dateTime.getSeconds()) }`;
  }

  return (
    <div className={ htmlClass }>
      <p>{ status.status } { statusTime } { timing }</p>
      { error }
    </div>
  );
};

ServiceStatus.propTypes = {
  status: PropTypes.object,
};

export default ServiceStatus;
