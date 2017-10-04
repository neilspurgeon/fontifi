import React from 'react';
import styles from '../select/style.css';

function SelectWeight(props) {

  return(
    <div className={styles.selectWrapper}>
      <select
        className={styles.Select}
        onChange={props.handleChange}
        value={props.value}>
        { props.options.map((text, index) => {

          if (!text.match('italic')) {
            return (
              <option
              value={text}
              key={index}
              data={index}>{text}
              </option>
            );
          } else {
            return null;
          }
        })}
      </select>
    </div>
  );
}

export default SelectWeight;