import React from 'react';
import styles from './style.css';
import PrimaryCta from 'components/forms/primaryCta';
import Input from 'components/forms/input';
import Auth from 'utils/authService/AuthService.js';

class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    this.setState({
      [property]: event.target.value
    });
  }

  errCallback(err) {
    console.log(err);
  }

  signup(e) {
    e.preventDefault();
    const auth = new Auth();
    auth.signup(this.state.email, this.state.password, this.errCallback);
  };

  render() {
    return (
      <div>
        <p>{this.props.message}</p>
        <h1 className={styles.heading}>Create Account with</h1>
        <div className={styles.divider}>or</div>
        <form onSubmit={this.signup}>
          <Input type="email" name="email" placeholder="Email Address" handleChange={this.handleChange} />
          <Input type="password" name="password" placeholder="Password" handleChange={this.handleChange} />
          <PrimaryCta text="Sign Up" type="submit" value="submit" />
        </form>
      </div>
    );
  };
}

export default SignUpForm;
