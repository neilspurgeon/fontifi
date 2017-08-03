import React from 'react';
import styles from './style.css';

function SignUpModal (props) {

    return (
      <div>
        <p>{props.message}</p>
        <h1>Create Account with</h1>
        <div className={styles.divider}>or</div>
        <form>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <submit>Sign Up</submit>
        </form>
      </div>
    );
}


export default SignUpModal;