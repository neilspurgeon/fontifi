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
    return (
      <div className={styles.accountContainer}>
        <div className={styles.accountIcon} onMouseOver={this.openMenu} onMouseOut={this.closeMenu}></div>
        <div className={dropdownStyles}>
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