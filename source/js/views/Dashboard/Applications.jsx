import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import Application from './Application';

const Applications = ({ apps }) => {
  const renderedApps = apps.valueSeq().map((app) => {
    return <Application key={ app.id } app={ app } />;
  });

  return (
    <section className='applocations'>
      <h2>Applications</h2>
      { renderedApps }
    </section>
  );
};

Applications.propTypes = {
  apps: PropTypes.instanceOf(Immutable.Map),
};

export default Applications;
