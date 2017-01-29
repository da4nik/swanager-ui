import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

const mapStoreToProps = ({ services }) => ({
  services,
});

const Application = ({ app, services }) => {
  return (
    <div>
      { app.name }
      <p>{ services }</p>
    </div>
  );
};

Application.propTypes = {
  app: PropTypes.object,
  services: PropTypes.instanceOf(Immutable.Map),
};

export default connect(mapStoreToProps)(Application);
