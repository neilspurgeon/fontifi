import React from 'react';
import styles from './style.css';
import Portal from 'react-portal';

function Modal (props) {

  let isOpen = props.isOpen ? styles.show : styles.hide;

    return (
      <Portal isOpened={props.isOpen} closeOnEsc={true} >
        <div className={[styles.overlay, isOpen].join(' ')}>
          <div className={styles.modal}>
            <button onClick={props.closeModal}>Close</button>
            {props.content || 'Modal'}
          </div>
        </div>
      </Portal>
    );
}

export default Modal;