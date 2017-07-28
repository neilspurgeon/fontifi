import React from 'react';
import styles from './style.css';

function ComboSlider(props) {

  return(
    <span className={styles.ComboSlider}>
    <input
      className={styles.Slider}
      type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      onChange={props.handleChange}
    />
    <input
      className={styles.Input}
      onChange={props.handleChange}
      type="number"
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
    />
    </span>
  );
};

export default ComboSlider;