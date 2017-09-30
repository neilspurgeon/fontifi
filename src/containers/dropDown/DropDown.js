import React from 'react';
import styles from './style.css';
import ReactModal from 'react-modal';

function DropDown (props) {

  return (
    <ReactModal
      contentLabel={props.contentLabel}
      className={{
          base: styles.modal,
          afterOpen: 'myClass_after-open',
          beforeClose: 'myClass_before-close'
        }}
        overlayClassName={{
          base: styles.overlay,
          afterOpen: styles.overlayReveal,
          beforeClose: styles.overlayClose
        }}
      closeTimeoutMS={200}
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}>

      {props.children}

    </ReactModal>
  );
}

export default DropDown;