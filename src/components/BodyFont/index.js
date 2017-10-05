import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';

function BodyFont (props) {

  let bodyClasses = ClassNames(styles.body, {[styles.isActive] : props.activeFontType === 'body'});

  const text = 'Press spacebar or click the button below to load new font combinations. Use the editor panel on the right to fine tune or to manually pick new fonts. When you find something you like, save your font pair for easy reference later. All this text is editable and can be replaced with whatever you want.';

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