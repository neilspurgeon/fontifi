import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

class SelectFontDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  };

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
          onClick={this.toggleDropDown}>
          <span className={styles.dropDownLabel}>{this.props.value.family}</span>
        </div>
        <ul
          className={optionsWrapperClasses}
          onClick={this.closeDropDown}>
          {this.props.options.map((font, index) => {
            return (
              <li
                className={styles.option}
                key={index}
                onClick={this.props.handleChange.bind(this, font)}>
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