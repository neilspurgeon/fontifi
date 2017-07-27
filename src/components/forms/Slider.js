import React from 'react';

function Slider(props) {

  return(
    <input
      type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      onChange={props.handleChange}
    />
  );
};

export default Slider;