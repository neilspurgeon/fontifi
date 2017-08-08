import React from 'react';
import styles from './style.css';

function TextInput(props) {

  return(
    <input
      type="text"
      className={styles.input}
      onChange={props.handleChange}
      value={props.value}
      placeholder={props.placeholder} />
    );
}

export default TextInput;