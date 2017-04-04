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

  render() {
    return (
      <button type='submit' className='sign-out' onClick={ () => { this.props.signout(); } }>Sign Out</button>
    );
  }
}

