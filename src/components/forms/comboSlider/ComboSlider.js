import React from 'react';
import styles from './style.css';

class ComboSlider extends React.Component {

  // setFocus = () => {
  //   this.refs.myInput.focus();
  // };

  stepUp = () => {
    const currValue = this.props.value;
    const stepAmount = Number(this.props.step);
    const newValue = currValue + stepAmount;
    const roundNewValue = Number(newValue.toPrecision(2));

    if (newValue >= this.props.min && newValue <= this.props.max) {
      this.props.setFontValue(roundNewValue);
    }
  };

  stepDown = () => {
    const currValue = this.props.value;
    const stepAmount = Number(this.props.step);
    const newValue = currValue - stepAmount;
    const roundNewValue = Number(newValue.toPrecision(2));

    if (newValue >= this.props.min && newValue <= this.props.max) {
      this.props.setFontValue(roundNewValue);
    }
  };



  render() {
    // set slider fill percentage
    const sliderFillWidth = {width:  ((this.props.value - this.props.min) / (this.props.max - this.props.min)) * 100  + '%'};

    return(
      <span className={styles.ComboSlider}>
        <div className={styles.sliderContainer}>
          <input
            className={styles.Slider}
            type="range"
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            value={this.props.value}
            onChange={this.props.handleChange}
          />
          <div className={styles.sliderFill} style={sliderFillWidth} />
        </div>
        <input
          ref="myInput"
          className={styles.Input}
          onChange={this.props.handleChange}
          type="number"
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.props.value}
        />

        <button className={styles.stepUp} type="button" value={this.props.value}  onClick={this.stepUp} tabIndex="-1" />
        <button className={styles.stepDown} type="button" value={this.props.value} onClick={this.stepDown} tabIndex="-1" />
      </span>
    );
  }
};

export default ComboSlider;