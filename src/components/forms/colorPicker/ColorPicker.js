import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import { SketchPicker } from 'react-color';
import onClickOutside from 'react-onclickoutside';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      isFocused: false,
      isOpen: false
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

  openColorPicker = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  closeColorPicker = () => {
    this.setState({
      isOpen: false
    });
  }

  handleClickOutside = () => {
    this.closeColorPicker();
  }

  handleChange = (color) => {
    const value = { rgba: color.rgb, hex: color.hex };
    this.props.onColorPickerChange('color', value);
  }

  handleBlur = (event) => {
    const value = event.target.value;
    const validValue = this.convertInput(value);
    this.toggleFocus();

    // reset to default if not input is entered
    if (!validValue) {
      return event.target.value = event.target.defaultValue;
    }
    event.target.value = validValue.hex;
    this.handleChange(validValue);
  }

  hexToRGB = (hex) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return {r: r, g: g, b: b, a: 1};
  }

  shortHandToHex = (color) => {
  	const digits = color.split('');
  	let hex = digits[0] + digits[1] + digits[1] + digits[2] + digits[2] + digits[3] + digits[3];
  	return hex;
  }

  hexToColorObj = (hex) => {
    return {
      rgb: this.hexToRGB(hex),
      hex: hex
    };
  }

  convertInput = (value) => {
    const length = value.length;
    if (length >= 7) {
      value = value.substring(7, 0);
    } else if (length >= 4) {
      value = value.substring(4, 0);
      value = this.shortHandToHex(value);
    } else {
      return false;
    }

    const isColor =  /^#[0-9A-F]{6}$/i.test(value);
    if (isColor) {
      return this.hexToColorObj(value);
    }
    return false;
  }

  render() {
    const containerClasses = ClassNames(styles.container, {[styles.isHovered] : this.state.isHovered === true}, {[styles.isFocused] : this.state.isFocused === true});
    const colorPickerClasses = ClassNames(
      styles.colorPicker,
      {[styles.isOpen] : this.state.isOpen === true}
    );
    let colorStyle = {
      backgroundColor: this.props.color.hex,
      opacity: this.props.color.rgba.a
    };

    return (
      <div className={containerClasses}>
        <SketchPicker
          className={colorPickerClasses}
          color={this.props.color.rgba}
          onChange={this.handleChange} />
        <span
          className={styles.colorPickerSwatch}
          style={colorStyle}
          onClick={this.openColorPicker}
        />
        <input
          className={styles.ColorCode}
          defaultValue={this.props.color.hex}
          onFocus={this.toggleFocus}
          onBlur={this.handleBlur.bind(this)}
          onMouseEnter={this.toggleHover}
          onMouseOut={this.toggleHover}
        />
      </div>
    );
  }
};

export default onClickOutside(ColorPicker);
