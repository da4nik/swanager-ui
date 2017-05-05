import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signout } from '../../actions/signin';

const mapDispatchToProps = dispatch => ({
  onSignout: () => dispatch(signout()),
});

const mapStoreToProps = ({ currentUser }) => ({ currentUser });

@connect(mapStoreToProps, mapDispatchToProps)
export default class SignOut extends Component {
  static propTypes = {
    onSignout: PropTypes.func,
    currentUser: PropTypes.object,
  }

  render() {
    const { onSignout, currentUser } = this.props;
    return (<div>
      { currentUser.get('email') }
      <button
        type='submit'
        className='sign-out'
        onClick={ () => { onSignout(); } }
      >{ 'Sign Out' }
      </button>
    </div>
    );
  }
}
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

