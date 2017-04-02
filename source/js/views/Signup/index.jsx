import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import InputField from '../../components/Inputs/InputField';
import { signup, resetSignup } from '../../actions/signup';

import { ROUTE_SIGN_IN } from '../../routes'

const mapDispatchToProps = dispatch => ({
  resetSignup: () => {
    return dispatch(resetSignup());
  },
  signup: (email, password, password_confirmation) => {
    return dispatch(signup(email, password, password_confirmation));
  },
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
    signup: PropTypes.func,
    responseData: React.PropTypes.object,
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
      password_confirmation: '',
    };
  }

  componentWillMount() {
    this.redirectAuthenticated();
    this.props.resetSignup();
  }

  componentWillUpdate(nextProps) {
    this.redirectAuthenticated(nextProps);
  }

  redirectAuthenticated(nextProps = this.props) {
    const { isLoggedIn, responseData, router } = nextProps;

    if (isLoggedIn) {
      return router.replace('/');
    }
    
    // if success register
    if (responseData) {
      this.props.resetSignup();
      router.push(ROUTE_SIGN_IN);
    }
  }


  // UI EVENTS

  onSignup(event) {
    const { email, password, password_confirmation } = this.state;
    this.props.signup(email, password, password_confirmation);
    event.preventDefault();
  }

  onEmailChanged(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChanged(event) {
    this.setState({ password: event.target.value });
  }

  onPasswordConfirmationChanged(event) {
    this.setState({ password_confirmation: event.target.value });
  }


  // RENDER SECTION

  renderErrors() {
    const { errors } = this.props;
    if (errors) {
      return (<p>{ errors }</p>);
    }
    return null;
  }

  render() {
    return (
      <div>
        <section className='container signin'>
          <h2 className='signin__header'>Create your account</h2>
          <form className='signin__form' onSubmit={ (event) => { this.onSignup(event); } }>
            <InputField inputType='text' onChange={ (event) => { this.onEmailChanged(event); } } value={ this.state.email } placeholder='E-mail address' />
            <InputField inputType='password' onChange={ (event) => { this.onPasswordChanged(event); } } value={ this.state.password } placeholder='Password' />
            <InputField inputType='password' onChange={ (event) => { this.onPasswordConfirmationChanged(event); } } value={ this.state.password_confirmation } placeholder='Password Confirmation' />
            { this.renderErrors() }
            <button type='submit'>Sign up</button>
          </form>
        </section>
        <section className='container signin_bottom'>
          <p>
            <span>Already registered? </span>
            <Link to='/signin'>Sign In</Link>
          </p>
        </section>
      </div>
    );
  }
}

export default Signup;

