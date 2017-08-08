import React from 'react';
import styles from './style.css';

function PrimaryCta(props) {
  if (props.size === 'small') {
    return <button className={[styles.primaryCta, styles.primaryCtaSmall].join(' ')} onClick={props.onClick}>{props.text}</button>;
  } else if (props.size === 'large') {
    return <button className={[styles.primaryCta, styles.primaryCtaLarge].join(' ')} onClick={props.onClick}>{props.text}</button>;
  } else {
    return <button className={styles.primaryCta} onClick={props.onClick}>{props.text}</button>;
  }
};

export default PrimaryCta;