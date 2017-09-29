import React, {Component} from 'react';
import styles from './style.css';
import Modal from 'containers/modal';
import SignUpForm from 'components/signUpForm';
import Auth from 'utils/authService/AuthService.js';

class AuthModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        closeModal={this.props.closeModal}
        contentLabel="Sign Up or Log In">
        <SignUpForm successCallback={this.props.closeModal}/>
      </Modal>
    );
  }
}

export default AuthModal;