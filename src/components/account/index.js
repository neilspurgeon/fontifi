import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import Auth from 'utils/authService/AuthService.js';
import Modal from 'containers/modal';
import SignUpForm from 'components/signUpForm';

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      authModalOpen: false
    };
  }

  handleCloseAuthModal = () => {
    this.setState({
      authModalOpen: false
    });
  };

  handleOpenAuthModal = (type) => {
    if (this.props.navIsOpen) {
      this.props.closeNav();
    };
    this.setState({
      authModalOpen: true,
      formType: type
    });
  };

  render() {
    const auth = new Auth();
    let accountContainerStyles = ClassNames(styles.accountContainer, {[styles.isActive] : this.state.active });

    if (auth.isAuthenticated()) {
      return (
        <div className={accountContainerStyles}>
          <ul className={styles.accountUl}>
              <li className={styles.accountLi}>
                <a className={styles.navLink} onClick={auth.logout}>Log Out</a>
              </li>
          </ul>
        </div>
      );
    }

    return (
      <div>
        <ul className={styles.accountUl}>
          <li className={styles.accountLi}>
            <a className={styles.navLink} onClick={() => this.handleOpenAuthModal('login')}>Log In</a>
          </li>
          <li className={styles.accountLi}>
            <a className={styles.navLink} onClick={() => this.handleOpenAuthModal('signup')}>Sign Up</a>
          </li>
        </ul>
        <Modal
          isOpen={this.state.authModalOpen}
          closeModal={this.handleCloseAuthModal}
          contentLabel="Sign Up or Log In">
          <SignUpForm successCallback={this.handleCloseAuthModal} type={this.state.formType} />
        </Modal>
      </div>
    );
  }
};

export default Account;
