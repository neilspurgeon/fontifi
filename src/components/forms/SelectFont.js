import React from 'react';
import styles from './style.css';

function SelectFont(props) {

  return(
    <select
      className={styles.Select}
      onChange={props.handleChange}
      value={props.value}>
      { props.options.map((obj, index) => {
        return <option
          value={obj[props.keyValue]}
          key={index}
          data={index}>{obj[props.keyValue]}</option>;
      })}
    </select>
  );
}

export default SelectFont;