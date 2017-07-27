import React from 'react';


function ColorPicker(props) {

  return (
    <input
      type="color"
      value={props.color}
      onChange={props.handleChange}
    />
  );
};

export default ColorPicker;