import React from 'react';
import { connect } from 'react-redux';

import InputField from '../../components/Inputs/InputField';
import { signin } from '../../actions/signin'

const mapDispatchToProps = dispatch => ({
  signin: (email, password) => dispatch(signin(email, password))
});

const mapStoreToProps = ({ auth }, { router }) => {
  const authToken = auth.get('authToken')
  return {
    authErrors: auth.get('errors'),
    isLoggedIn: (authToken != null && authToken.length > 0),
    redirectPath: auth.get('redirectPath'),
    router
  }
};

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillUpdate(nextProps) {
    const { isLoggedIn, redirectPath, router } = nextProps;
    // If already logged in, redirect to back or to root
    if (isLoggedIn) {
      router.replace((redirectPath && redirectPath.length > 0) ? redirectPath : '/' )
    }
  }

  onSignin() {
    let { email, password } = this.state;
    this.props.signin(email, password)
  }

  onPasswordChanged(event) {
    this.setState({ password: event.target.value })
  }

  onEmailChanged(event) {
    this.setState({ email: event.target.value })
  }

  renderErrors() {
    const { authErrors } = this.props
    if (authErrors) {
      return (<p>{ authErrors }</p>)
    }
    return null;
  }

  render() {
    return (
      <section className='signin'>
        <h2 className='signin__header'>{'Sign in'}</h2>
        <div className='signing__form'>
          { this.renderErrors() }
          <InputField inputType="text" title="Email" onChange={ this.onEmailChanged.bind(this) } />
          <InputField inputType="password" title="Password" onChange={ this.onPasswordChanged.bind(this) }/>
          <button onClick={ () => { this.onSignin() } }>{'Sign in'}</button>
        </div>
      </section>
    )
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Signin)
