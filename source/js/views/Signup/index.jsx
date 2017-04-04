import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import InputField from '../../components/Inputs/InputField';
import { doSignup, resetSignup, signupSetError } from '../../actions/signup';

import { ROUTE_SIGN_IN } from '../../routes';

const mapDispatchToProps = dispatch => ({
  resetSignup: () => dispatch(resetSignup()),
  signupSetError: (error) => dispatch(signupSetError(error)),
  signup: (email, password, passwordConfirmation) => dispatch(doSignup(email, password, passwordConfirmation)),
});

const mapStoreToProps = ({ signup, auth }, { router }) => {
  const authToken = auth.get('authToken');
  return {
    errors: signup.get('errors'),
    responseData: signup.get('data'),
    isLoggedIn: !!authToken,
    router,
  };
};

@connect(mapStoreToProps, mapDispatchToProps)
class Signup extends React.Component {

  static propTypes = {
    resetSignup: PropTypes.func,
    signupSetError: PropTypes.func,
    signup: PropTypes.func,
    responseData: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    router: PropTypes.object,
    errors: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  }

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  componentWillMount() {
    this.redirectAuthenticated();
    this.props.resetSignup();
  }

  componentWillUpdate(nextProps) {
    this.redirectAuthenticated(nextProps);
  }

  // UI EVENTS

  onSignup(event) {
    event.preventDefault();
    const { email, password, passwordConfirmation } = this.state;
    if (email, password) {
      this.props.signup(email, password, passwordConfirmation);
    } else {
      this.props.signupSetError('Email or Password is empty');
    }
  }

  onEmailChanged(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChanged(event) {
    this.setState({ password: event.target.value });
  }

  onPasswordConfirmationChanged(event) {
    this.setState({ passwordConfirmation: event.target.value });
  }

  // END UI EVENTS

  redirectAuthenticated(nextProps = this.props) {
    const { isLoggedIn, responseData, router } = nextProps;

    if (isLoggedIn) {
      router.replace('/');
    }

    // if success register
    if (responseData) {
      this.props.resetSignup();
      router.push(ROUTE_SIGN_IN);
    }
  }


  // RENDER SECTION

  renderErrors() {
    const { errors } = this.props;

    if (errors) {
      return (<p className='formError'>{ errors }</p>);
    }
    return null;
  }

  render() {
    return (
      <section className='container signin'>
        <div className='signinTop'>
          <h2 className='signinHeader'>Create your account</h2>
          <form className='signinForm' onSubmit={ (event) => { this.onSignup(event); } }>
            <InputField className='inputField' inputType='text' onChange={ (event) => { this.onEmailChanged(event); } } value={ this.state.email } placeholder='E-mail address' />
            <InputField className='inputField' inputType='password' onChange={ (event) => { this.onPasswordChanged(event); } } value={ this.state.password } placeholder='Password' />
            <InputField className='inputField' inputType='password' onChange={ (event) => { this.onPasswordConfirmationChanged(event); } } value={ this.state.passwordConfirmation } placeholder='Password Confirmation' />
            { this.renderErrors() }
            <button className='submitBtn' type='submit'>Sign up</button>
          </form>
        </div>
        <div className='signinBottom'>
          <p className='goToSignUp'>
            <span>Already registered? </span>
            <Link to='/signin'>Sign In</Link>
          </p>
        </div>
      </section>
    );
  }
}

export default Signup;

