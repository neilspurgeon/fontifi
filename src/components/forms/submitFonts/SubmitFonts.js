import React, {Component} from 'react';
import styles from './style.css';
import Modal from 'containers/modal';
import SignUpForm from 'components/signUpForm';

class SubmitFonts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  render() {


    return (
      <div>
        <button className={styles.PrimaryCta} type="button" onClick={ false ? this.submit : this.openModal }>Submit Fonts</button>
        <Modal isOpen={this.state.modalOpen} closeModal={this.closeModal}>
          <SignUpForm />
        </Modal>

      </div>
    );
  }
}

export default SubmitFonts;