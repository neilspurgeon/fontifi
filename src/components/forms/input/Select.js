import React from 'react';
import styles from './style.css';

function Input(props) {

  return(
    <input
      type="text"
      className={styles.input}
      onChange={props.handleChange}
      value={props.value}
      placeholder={props.placeholder} />
    );
}

export default Input;