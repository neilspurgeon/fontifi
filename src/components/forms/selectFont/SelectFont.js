import React from 'react';
import styles from '../select/style.css';

function SelectFont(props) {

  return(
    <div className={styles.selectWrapper}>
      <select
        className={styles.Select}
        onChange={props.handleChange}
        value={JSON.stringify(props.value)}>
        { props.options.map((obj, index) => {
          return <option
            value={JSON.stringify(obj)}
            key={index}
            data={index}>{obj.family}</option>;
        })}
      </select>
    </div>
  );
}

export default SelectFont;