import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import WebFont from 'webfontloader';

class SelectFontDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      fontsLoaded: false
    };
  };

  loadFonts = (fontList) => {
    const fontArr = [];
    for (let i=0; i<fontList.length; i++) {
      fontArr.push(fontList[i].family);
    }

    WebFont.load({
      google: {
        families: fontArr
      }
    });

    this.setState({
      fontLoaded: true
    });
  }

  openDropDown = () => {
    this.setState({
      isOpen: true
    });
  }

  closeDropDown = () => {
    this.setState({
      isOpen: false
    });
  }

  toggleDropDown = () => {
    if (this.state.fontsLoaded === false) {
      this.loadFonts(this.props.options);
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClickOutside = () => {
    this.closeDropDown();
  }

  render() {
    let optionsWrapperClasses = ClassNames(
      styles.optionsWrapper,
      {[styles.isOpen] : this.state.isOpen}
    );

    return(
      <div className={styles.selectWrapper}>
        <div
          className={styles.Select}
          tabIndex="1"
          onBlur={this.closeDropDown}
          onClick={this.toggleDropDown}>
          <span className={styles.dropDownLabel}>{this.props.value.family}</span>
        </div>
        <ul
          className={optionsWrapperClasses}
          onClick={this.closeDropDown}>
          {this.props.options.map((font, index) => {
            let style = {
              fontFamily: font.family + ', Poppins'
            };

            return (
              <li
                className={styles.option}
                key={index}
                onClick={this.props.handleChange.bind(this, font)}
                style={style}>
                {font.family}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

export default onClickOutside(SelectFontDropDown);