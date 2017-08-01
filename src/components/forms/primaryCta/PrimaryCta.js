import React from 'react';
import styles from './style.css';

function PrimaryCta(props) {
  return(
    <button className={styles.PrimaryCta} onClick={props.onClick}>{props.text}</button>
  );
};

export default PrimaryCta;