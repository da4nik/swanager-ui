import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signout } from '../../actions/signin';

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout())
});

const mapStoreToProps = ({ auth }, { router }) => ({});

@connect(mapStoreToProps, mapDispatchToProps)
export default class SignOut extends Component {
  static propTypes = {
    signout: PropTypes.func,
  }

  onSignOut(event) {
    this.props.signout();
    event.preventDefault();
  }

  render() {
    return (
      <form className='SignOut' onSubmit={ (event) => { this.onSignOut(event); } }>
        <button type='submit'>Sign Out</button>
      </form>
    );
  }
}

