import React from 'react';

function GetFonts(props) {

  return(
    <p className={props.className}>Press <button onClick={props.triggerUpdateFonts}>Spacebar</button> to load new fonts</p>
  );
}

export default GetFonts;