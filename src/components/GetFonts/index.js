import React from 'react';
import styles from './style.css';

function GetFonts(props) {

  return(
    <p className={[styles.text, props.className].join(' ')}>Press <button className={styles.spacebarButton} onClick={props.triggerUpdateFonts}>spacebar</button> to generate new font combinations</p>
  );
}

export default GetFonts;