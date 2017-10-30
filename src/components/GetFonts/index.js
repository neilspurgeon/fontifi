import React from 'react';
import Button from 'components/forms/button';

function GetFonts(props) {

  return(
    <Button onClick={props.triggerUpdateFonts}
      className={props.className}
      text="Load New Fonts" />
  );
}

export default GetFonts;