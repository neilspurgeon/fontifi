import React from 'react';

function BodyFont (props) {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  if (props.fontFamily) {
    const fontFamilyString = props.fontFamily.split(' ').join('+');
    const url = 'https://fonts.googleapis.com/css?family=' + fontFamilyString;
    const fontStyle = {
      fontFamily: props.fontFamily,
      fontSize: props.fontSize,
      fontWeight: props.fontWeight
    };

    return (
      <div>
        <style>@import url("{url}");</style>
        <p style={fontStyle}>{text}</p>
      </div>
    );
  }

  return (
    <p>{text}</p>
  );
}


export default BodyFont;