import React from 'react';
import styles from '../select/style.css';

function SelectFont(props) {

  return(
    <div className={styles.selectWrapper}>
      <select
        className={styles.Select}
        onChange={props.handleChange}
        value={props.value}>
        { props.options.map((obj, index) => {
          return <option
            value={obj.family}
            key={index}
            data={index}>{obj.family}</option>;
        })}
      </select>
    </div>
  );
}

export default SelectFont;