import React from 'react';
import styles from './style.css';

function Button(props) {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
      type={ props.type || 'button'}
      value={props.value}>{props.text}</button>
  );
};

export default Button;