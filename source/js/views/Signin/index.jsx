import React, { PropTypes } from 'react';
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
class Signin extends React.Component {

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
      <section className='container signin'>
        <div className='signinTop'>
          <h2 className='signinHeader'>Log-in to your account</h2>
          <form className='signinForm' onSubmit={ (event) => { this.onSignin(event); } }>
            <InputField inputClass='inputField' inputType='text' onChange={ (event) => { this.onEmailChanged(event); } } value={ this.state.email } placeholder='E-mail address' />
            <InputField inputClass='inputField' inputType='password' onChange={ (event) => { this.onPasswordChanged(event); } } value={ this.state.password } placeholder='Password' />
            { this.renderErrors() }
            <button className='submitBtn' type='submit'>{ 'Sign in' }</button>
          </form>
        </div>
        <div className='signinBottom'>
          <p className='goToSignUp'>
            <span>New to us? </span>
            <Link to='/signup'>Sign Up</Link>
          </p>
        </div>
      </section>
    );
  }
}

export default Signin;
