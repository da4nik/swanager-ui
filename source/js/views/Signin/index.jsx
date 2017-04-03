import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import InputField from '../../components/Inputs/InputField';
import { signin, signinLoaded } from '../../actions/signin';

const mapDispatchToProps = dispatch => ({
  signinLoaded: () => {
    return dispatch(signinLoaded());
  },
  signin: (email, password) => {
    return dispatch(signin(email, password));
  },
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
class Signin extends React.Component {

  static propTypes = {
    signinLoaded: PropTypes.func,
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
    const { email, password } = this.state;
    this.props.signin(email, password);
    event.preventDefault();
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
      return (<p>{ authErrors }</p>);
    }
    return null;
  }

  render() {
    return (
      <div>
        <section className='container signin'>
          <h2 className='signin__header'>Log-in to your account</h2>
          <form className='signin__form' onSubmit={ (event) => { this.onSignin(event); } }>
            <InputField inputType='text' onChange={ (event) => { this.onEmailChanged(event); } } value={ this.state.email } placeholder='E-mail address' />
            <InputField inputType='password' onChange={ (event) => { this.onPasswordChanged(event); } } value={ this.state.password } placeholder='Password' />
            { this.renderErrors() }
            <button type='submit'>{ 'Sign in' }</button>
          </form>
        </section>
        <section className='container signin_bottom'>
          <p>
            <span>New to us? </span>
            <Link to='/signup'>Sign Up</Link>
          </p>
        </section>
      </div>
    );
  }
}

export default Signin;
