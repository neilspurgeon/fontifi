import React from 'react';
import styles from './style.css';
import PrimaryCta from 'components/forms/primaryCta';
import Input from 'components/forms/input';
import Auth from 'utils/authService/AuthService.js';

class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formType: 'signup',
      error: null,
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    this.setState({
      [property]: event.target.value
    });
  }

  handleFormType(type) {
    this.setState({
      formType: type
    });
  }

  errorCallback(error) {
    this.setState({
      error: error
    });
  }

  // optionally do something such as continue submitting form after authenticating
  successCallback = this.props.successCallback;

  signup(e) {
    e.preventDefault();
    const auth = new Auth();
    auth.signup(this.state.email, this.state.password, this.errorCallback, this.successCallback);
  };

  login(e) {
    e.preventDefault();
    const auth = new Auth();
    auth.login(this.state.email, this.state.password, this.errorCallback, this.successCallback);
  }

  render() {
    if (this.state.formType === 'signup') {
      return (
        <div className={styles.formContainer}>
          <p>{this.state.error || this.props.message }</p>
          <h1 className={styles.heading}>Sign Up</h1>
          <form onSubmit={this.signup}>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              handleChange={this.handleChange} />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              handleChange={this.handleChange} />
            <div className={styles.submitContainer}>
              <PrimaryCta text="Create Account" type="submit" value="submit" />
            </div>
          </form>
          <div className={styles.footer}>
            <p className={styles.footerMessage}>Already have an account? <a onClick={() => { this.handleFormType('login'); }}>Log In</a></p>
          </div>
        </div>
      );
    } else if (this.state.formType === 'login') {
      return (
        <div className={styles.formContainer}>
          <p>{this.state.error}</p>
          <h1 className={styles.heading}>Log In</h1>
          <form onSubmit={this.login}>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              handleChange={this.handleChange} />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              handleChange={this.handleChange} />
            <div className={styles.submitContainer}>
              <PrimaryCta text="Log In" type="submit" value="submit" />
            </div>
          </form>
          <div className={styles.footer}>
            <p className={styles.footerMessage}>Don't have an account? <a onClick={() => { this.handleFormType('signup'); }}>Sign Up</a></p>
          </div>
        </div>
      );
    }
  };
}

export default SignUpForm;
