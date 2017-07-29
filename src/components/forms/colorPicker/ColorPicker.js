import React, { Component } from 'react';
import styles from './style.css';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus() {
    console.log("focus");
    this.setState({
      focused: !this.state.focused
    });
  };

  render() {
    const swatchStyle = {backgroundColor: this.props.value};

    return (
      <div className={this.state.focused ? styles.focusedClass : styles.ColorPicker}>
        <label className={styles.CustomColorSwatch} style={swatchStyle}>
          <input
            className={styles.NativeColorSwatch}
            type="color"
            value={this.props.value}
            onChange={this.props.handleChange}
          />
        </label>
        <input
          className={styles.ColorCode}
          value={this.props.value}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
};

export default ColorPicker;