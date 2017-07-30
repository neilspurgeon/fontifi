import React from 'react';
import styles from './style.css';

function HeadingFont (props) {

  if (props.fontFamily) {
    const fontFamilyString = props.fontFamily.split(' ').join('+');
    const url = 'https://fonts.googleapis.com/css?family=' + fontFamilyString;
    let fontUrls = [url];
    fontUrls.push(url + ':' + props.fontWeight);
    const fontStyle = {
      fontFamily: props.fontFamily,
      fontSize: props.fontSize + 'px',
      fontWeight: props.fontWeight,
      letterSpacing: props.letterSpacing + 'em',
      color: props.color,
      lineHeight: props.lineHeight
    };

    return (
      <div>
        {fontUrls.map((fontUrl) => {
          return <style key={fontUrl}>@import url("{fontUrl}");</style>;
        })}
        <h1 contentEditable="true" spellCheck="false" className={styles.heading} style={fontStyle}>{props.text || 'Heading Font'}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className={styles.heading}>Heading</h1>
    </div>
  );
}

export default HeadingFont;