import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import WebFont from 'webfontloader';


function HeadingFont (props) {

  let headingClasses = ClassNames(styles.heading, {[styles.isActive] : props.activeFontType === 'heading'});

  if (props.fontFamily) {

    const weight = props.fontWeight;

    WebFont.load({
      google: {
        families: [props.fontFamily + ':' + props.fontWeight]
      }
    });

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
        {props.fontWeight}
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