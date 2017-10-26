import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import config from 'config';

function BodyFont (props) {

  let bodyClasses = ClassNames(styles.body, {[styles.isActive] : props.activeFontType === 'body'});

  const text = config.defaultBodyText;

  if (props.fontFamily) {
    const fontFamilyString = props.fontFamily.split(' ').join('+');
    const url = 'https://fonts.googleapis.com/css?family=' + fontFamilyString;
    let fontUrls = [url];

    const weight = props.fontWeight;
    if (weight !== 'regular' && weight !== 'normal' && weight !== '400') {
      fontUrls.push(url + ':' + props.fontWeight);
    }

    const color = props.color.rgba;
    const fontStyle = {
      fontFamily: props.fontFamily,
      fontSize: props.fontSize + 'px',
      fontWeight: props.fontWeight,
      letterSpacing: props.letterSpacing + 'em',
      color: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
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