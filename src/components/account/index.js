import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import Auth from 'utils/authService/AuthService.js';
import AuthModal from 'components/authModal';

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      authModalOpen: false
    };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleAuthModal = this.toggleAuthModal.bind(this);
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

  toggleAuthModal() {
    console.log('open sign up modal');
    this.setState({
      authModalOpen: !this.state.authModalOpen
    });
  };

  render() {
    const auth = new Auth();
    let dropdownStyles = ClassNames(styles.accountDropdown, {[styles.isActive] : this.state.active });
    let accountContainerStyles = ClassNames(styles.accountContainer, {[styles.isActive] : this.state.active });

    if (auth.isAuthenticated()) {
      return (
      <div className={accountContainerStyles} onMouseOver={this.openMenu} onMouseOut={this.closeMenu}>
        <div className={styles.accountIcon}></div>
        <div className={dropdownStyles} onMouseOut={this.closeMenu}>
          <div className={styles.background}></div>
          <ul className={styles.accountUl}>
            <li><a onClick={auth.logout}>Log Out</a></li>
          </ul>
        </div>
      </div>
      );
    }

    return (
      <div>
        <a onClick={this.toggleAuthModal}>Sign Up / Log In</a>
        <AuthModal modalOpen={this.state.authModalOpen} closeModal={this.toggleAuthModal}/>
      </div>
    );
  }
};

export default Account;