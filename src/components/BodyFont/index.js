import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';

function BodyFont (props) {

  let bodyClasses = ClassNames(styles.body, {[styles.isActive] : props.activeFontType === 'body'});

  const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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

        <p className={bodyClasses} onFocus={props.onFocus} contentEditable="true" spellCheck="false" style={fontStyle} dangerouslySetInnerHTML={{__html: text}} />
      </div>
    );
  }

  return (
    <p>{text}</p>
  );
}


export default BodyFont;