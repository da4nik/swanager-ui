import React, { PropTypes } from 'react';

const Service = ({ service }) => {
  return (
    <section className='service'>
      <div className='service__title'>{ service.name }</div>
    </section>
  );
};

Service.propTypes = {
  service: PropTypes.object,
};

export default Service;
