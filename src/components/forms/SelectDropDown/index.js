import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

class SelectDropDown extends React.Component {

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
          tabIndex="1"
          onBlur={this.closeDropDown}
          onClick={this.toggleDropDown}>
          <span className={styles.dropDownLabel}>{this.props.value}</span>
        </div>
        <ul
          className={optionsWrapperClasses}
          onClick={this.closeDropDown}>
          {this.props.options.map((value, index) => {

            return (
              <li
                className={styles.option}
                key={index}
                onMouseDown={this.props.handleChange.bind(this, value)}>
                {value}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

export default onClickOutside(SelectDropDown);