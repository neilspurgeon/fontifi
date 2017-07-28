import React from 'react';
import styles from './style.css';

function FormField(props) {

  return(
    <div className={styles.FormField}>
      <label className={styles.Label}>{props.labelText}</label>
      <span className={styles.Field}>
        {props.input}
      </span>
    </div>
  );
};

export default FormField;