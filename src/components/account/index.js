import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import Auth from 'utils/authService/AuthService.js';

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

  signupModal() {
    console.log('open sign up modal');
  };

  render() {
    const auth = new Auth();
    let dropdownStyles = ClassNames(styles.accountDropdown, {[styles.isActive] : this.state.active });
    let accountContainerStyles = ClassNames(styles.accountContainer, {[styles.isActive] : this.state.active });

    return (
      <div className={accountContainerStyles} onMouseOver={this.openMenu} onMouseOut={this.closeMenu}>
        <div className={styles.accountIcon}></div>
        <div className={dropdownStyles} onMouseOut={this.closeMenu}>
          <div className={styles.background}></div>
          <ul className={styles.accountUl}>
            { auth.isAuthenticated() ? <li><a onClick={auth.logout}>Log Out</a></li> : null }
            { auth.isAuthenticated() ? null : <li><a onClick={this.signupModal}>Log In</a></li> }
           { auth.isAuthenticated() ? null : <li>Sign Up</li> }
          </ul>

        </div>
      </div>
    );
  }
};

export default Account;