import React, { Component } from 'react';
import styles from './style.css';
import ClassNames from 'classnames';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      isFocused: false
    };
  }

  toggleHover = () => {
    this.setState({
      isHovered: !this.state.isHovered
    });
  };

  toggleFocus = () => {
    this.setState({
      isFocused: !this.state.isFocused
    });
  };

  render() {
    const swatchStyle = {backgroundColor: this.props.value};
    const containerClasses = ClassNames(styles.ColorPicker, {[styles.isHovered] : this.state.isHovered === true}, {[styles.isFocused] : this.state.isFocused === true});

    return (
      <div className={containerClasses}>
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
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
          onMouseEnter={this.toggleHover}
          onMouseOut={this.toggleHover}
        />
      </div>
    );
  }
};

export default ColorPicker;
