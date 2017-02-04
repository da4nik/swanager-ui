import React, { Component, PropTypes } from 'react';
import Notifications from '../../components/Global/Notifications';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }


  render() {
    const { children } = this.props;

    return (
      <div className='App'>
        <div className='Page'>
          { children }
        </div>
        <Notifications />
      </div>
    );
  }
}
