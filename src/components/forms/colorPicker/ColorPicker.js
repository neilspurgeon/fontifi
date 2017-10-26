import React, { Component } from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import { SketchPicker } from 'react-color';
import onClickOutside from 'react-onclickoutside';


class ColorPicker extends Component {
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
    this.props.onColorPickerChange(color.rgb, color.hex);
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
          value={this.props.color.hex}
          onChange={this.props.onInputChange}
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
          onMouseEnter={this.toggleHover}
          onMouseOut={this.toggleHover}
        />
      </div>
    );
  }
};

export default onClickOutside(ColorPicker);
