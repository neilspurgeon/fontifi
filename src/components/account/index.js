import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import Auth from 'utils/authService/AuthService.js';
import AuthModal from 'components/authModal';
import DropDown from 'containers/dropDown';
import Button from 'components/forms/button';

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      authModalOpen: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleAuthModal = this.toggleAuthModal.bind(this);
  }

  toggleDropdown() {
    this.setState({
      active: !this.state.active
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
    let accountContainerStyles = ClassNames(styles.accountContainer, {[styles.isActive] : this.state.active });

    if (auth.isAuthenticated()) {
      return (
      <div className={accountContainerStyles}>
        <div className={styles.accountIcon} onClick={this.toggleDropdown}></div>
        <DropDown isOpen={this.state.active} closeModal={this.toggleDropdown}>
        <div className={styles.accountDropdown}>
          <div className={styles.background}></div>
          <ul className={styles.accountUl}>
            <li><a onClick={auth.logout}>Log Out</a></li>
          </ul>
        </div>
        </DropDown>
      </div>
      );
    }

    return (
      <div>
        <Button onClick={this.toggleAuthModal} text="Sign Up / Log In" />
        <AuthModal modalOpen={this.state.authModalOpen} closeModal={this.toggleAuthModal}/>
      </div>
    );
  }
};

export default Account;