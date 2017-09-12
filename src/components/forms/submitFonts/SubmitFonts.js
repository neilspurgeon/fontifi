import React, {Component} from 'react';
import styles from './style.css';
import Modal from 'containers/modal';
import SignUpForm from 'components/signUpForm';
import Auth from 'utils/authService/AuthService.js';

class SubmitFonts extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeAndSubmit = this.closeAndSubmit.bind(this);
  }

  submit() {
    console.log('submitting fonts');
  }

  openModal() {
    this.setState({
      modalOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false
    });
  }

  closeAndSubmit() {
    this.closeModal();
    this.submit();
  }

  render() {

    const auth = new Auth();

    return (
      <div>

        { auth.isAuthenticated() ? <button type="button" onClick={auth.logout}>Log Out</button> : null }

        <button
          className={styles.PrimaryCta}
          type="button"
          onClick={ auth.isAuthenticated() ? this.submit : this.openModal }>
          Submit Fonts
        </button>

        <Modal
          isOpen={this.state.modalOpen}
          closeModal={this.closeModal}
          contentLabel="Sign Up or Log In">
          <SignUpForm message={'Please create an account or log in first'} successCallback={this.closeAndSubmit}/>
        </Modal>

      </div>
    );
  }
}

export default SubmitFonts;