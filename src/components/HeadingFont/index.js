import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';


function HeadingFont (props) {

  let headingClasses = ClassNames(styles.heading, {[styles.isActive] : props.activeFontType === 'heading'});

  if (props.fontFamily) {
    const fontFamilyString = props.fontFamily.split(' ').join('+');
    const url = 'https://fonts.googleapis.com/css?family=' + fontFamilyString;
    let fontUrls = [url];

    const weight = props.fontWeight;
    if (weight !== 'regular' && weight !== 'normal' && weight !== '400') {
      fontUrls.push(url + ':' + props.fontWeight);
    }

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
        <h1 onFocus={props.onFocus} contentEditable="true" spellCheck="false" className={headingClasses} style={fontStyle}>{props.text || 'Heading Font'}</h1>
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