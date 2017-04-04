import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signout } from '../../actions/signin';

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout()),
});

@connect(null, mapDispatchToProps)
export default class SignOut extends Component {
  static propTypes = {
    signout: PropTypes.func,
  }

  onSignOut(event) {
    event.preventDefault();
    this.props.signout();
  }

  render() {
    return (
      <button type='submit' className='SignOut' onClick={ (event) => { this.onSignOut(event); } }>Sign Out</button>
    );
  }
}

