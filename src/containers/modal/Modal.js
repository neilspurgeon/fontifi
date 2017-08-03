import React from 'react';
import styles from './style.css';

function Modal (props) {

  let show = props.show ? styles.show : styles.hide;

    return (
      <div className={[styles.overlay, show].join(' ')}>
        <div className={styles.modal}>
          <button onClick={props.toggleModal}>Close</button>
          {props.content || 'Modal'}
        </div>
      </div>
    );

}

export default Modal;