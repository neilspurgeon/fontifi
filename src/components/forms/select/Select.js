import React from 'react';
import styles from './style.css';

function Select(props) {

  return(
    <div className={styles.selectWrapper}>
      <select
        className={styles.Select}
        onChange={props.handleChange}
        value={props.value}>
        { props.options.map((text, index) => {
          return <option
            value={text}
            key={index}
            data={index}>{text}</option>;
        })}
      </select>
    </div>
  );
}

export default Select;