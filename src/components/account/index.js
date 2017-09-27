import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu() {
    this.setState({
      active: true
    });
  }

  closeMenu() {
    this.setState({
      active: false
    });
  }


  render() {
    let dropdownStyles = ClassNames(styles.accountDropdown, {[styles.isActive] : this.state.active });
    let accountContainerStyles = ClassNames(styles.accountContainer, {[styles.isActive] : this.state.active });

    return (
      <div className={accountContainerStyles} onMouseOver={this.openMenu} onMouseOut={this.closeMenu}>
        <div className={styles.accountIcon}></div>
        <div className={dropdownStyles} onMouseOut={this.closeMenu}>
          <div className={styles.background}></div>
          <ul className={styles.accountUl}>
            <li>Log Out</li>
            <li>Log In</li>
            <li>Sign Up</li>
          </ul>

        </div>
      </div>
    );
  }
};

export default Account;