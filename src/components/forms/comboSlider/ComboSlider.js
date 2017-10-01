import React from 'react';
import styles from './style.css';

function ComboSlider(props) {

  const stepUp = () => {
    const currValue = props.value;
    const stepAmount = Number(props.step);
    const newValue = currValue + stepAmount;
    const roundNewValue = Number(newValue.toPrecision(2));

    if (newValue >= props.min && newValue <= props.max) {
      props.setFontValue(roundNewValue);
    }
  };

  const stepDown = () => {
    const currValue = props.value;
    const stepAmount = Number(props.step);
    const newValue = currValue - stepAmount;
    const roundNewValue = Number(newValue.toPrecision(2));

    if (newValue >= props.min && newValue <= props.max) {
      props.setFontValue(roundNewValue);
    }
  };

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
    <button type="button" value={props.value} onClick={stepUp} />
    <button type="button" value={props.value} onClick={stepDown} />
    </span>
  );
};

export default ComboSlider;