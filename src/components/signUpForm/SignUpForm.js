import React from 'react';
import styles from './style.css';
import PrimaryCta from 'components/forms/primaryCta';
import Input from 'components/forms/input';

function SignUpForm (props) {

  return (
    <div>
      <p>{props.message}</p>
      <h1 className={styles.heading}>Create Account with</h1>
      <div className={styles.divider}>or</div>
      <form>
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <PrimaryCta text="Sign Up"/>
      </form>
    </div>
  );
}


export default SignUpForm;