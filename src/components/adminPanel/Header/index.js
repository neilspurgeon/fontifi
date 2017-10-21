import React from 'react';
import styles from './style.css';

function Header (props) {

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>{props.title}</h1>
    </div>
  );
}


export default Header;
