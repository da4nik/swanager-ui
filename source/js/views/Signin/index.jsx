import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import InputField from '../../components/Inputs/InputField';
import { signin, signinLoaded, signinSetError } from '../../actions/signin';

const mapDispatchToProps = dispatch => ({
  signinLoaded: () => dispatch(signinLoaded()),
  signinSetError: (error) => dispatch(signinSetError(error)),
  signin: (email, password) => dispatch(signin(email, password)),
});

const mapStoreToProps = ({ auth }, { router }) => {
  const authToken = auth.get('authToken');
  return {
    authErrors: auth.get('errors'),
    isLoggedIn: (authToken != null && authToken.length > 0),
    redirectPath: auth.get('redirectPath'),
    router,
  };
};

@connect(mapStoreToProps, mapDispatchToProps)
class Signin extends Component {

  static propTypes = {
    signinLoaded: PropTypes.func,
    signinSetError: PropTypes.func,
    signin: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    redirectPath: PropTypes.string,
    router: PropTypes.object,
    authErrors: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  }

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillMount() {
    this.redirectAuthenticated();
    this.props.signinLoaded();
  }

  componentWillUpdate(nextProps) {
    this.redirectAuthenticated(nextProps);
  }

  onSignin(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.props.signin(email, password);
    } else {
      this.props.signinSetError('Email or Password is empty');
    }
  }

  onPasswordChanged(event) {
    this.setState({ password: event.target.value });
  }

  onEmailChanged(event) {
    this.setState({ email: event.target.value });
  }

  redirectAuthenticated(nextProps = this.props) {
    const { isLoggedIn, redirectPath, router } = nextProps;
    // If already logged in, redirect to back or to root
    if (isLoggedIn) {
      router.replace((redirectPath && redirectPath.length > 0) ? redirectPath : '/');
    }
  }

  renderErrors() {
    const { authErrors } = this.props;
    if (authErrors) {
      return (<p className='formError'>{ authErrors }</p>);
    }
    return null;
  }

  render() {
    return (
      <section className='container authBlock'>
        <div className='signin'>
          <h2 className='signin__header'>Log-in to your account</h2>
          <form className='signin-form' onSubmit={ (event) => { this.onSignin(event); } }>
            <InputField inputClass='signin-form__input' inputType='text' onChange={ (event) => { this.onEmailChanged(event); } } value={ this.state.email } placeholder='E-mail address' />
            <InputField inputClass='signin-form__input' inputType='password' onChange={ (event) => { this.onPasswordChanged(event); } } value={ this.state.password } placeholder='Password' />
            { this.renderErrors() }
            <button className='signin-form__button' type='submit'>{ 'Sign in' }</button>
          </form>
        </div>
        <div className='goToSignUp'>
          <span>New to us? </span>
          <Link to='/signup'>Sign Up</Link>
        </div>
      </section>
    );
  }
}

export default Signin;
