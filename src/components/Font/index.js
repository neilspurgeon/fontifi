import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import WebFont from 'webfontloader';

class Font extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontFamily: this.props.fontFamily
    };
  };

  componentWillReceiveProps(nextProps) {
    // Only run if props are different
    if ((nextProps.fontFamily !== this.props.fontFamily) || (nextProps.fontWeight !== this.props.fontWeight)) {
      WebFont.load({
        google: {
          families: [nextProps.fontFamily + ':' + nextProps.fontWeight]
        },

        // use fontactive instead of active because of a bug that prevents the 2nd instance from calling
        // https://github.com/typekit/webfontloader/issues/345
        fontactive: () => {
          // prevents flash of unstyled text by waiting to for font to load before changing
          this.setState({ fontFamily: nextProps.fontFamily });
          console.log('font loaded and state set');
        }
      });
    }
  }

  render() {
    let classes = ClassNames(styles.font, {[styles.isActive] : this.props.isActive});
    // const text = config.defaultHeadingText;
    const text = this.props.text;

    const color = this.props.color.rgba;
    const fontStyle = {
      fontFamily: this.state.fontFamily,
      fontSize: this.props.fontSize + 'px',
      fontWeight: this.props.fontWeight,
      letterSpacing: this.props.letterSpacing + 'em',
      color: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
      lineHeight: this.props.lineHeight
    };

    return (
      <div className={styles.fontContainer}>
          <input type="checkbox" className={styles.lock} onClick={this.props.onLockToggle} />
          <span onFocus={this.props.onFocus} contentEditable={true} suppressContentEditableWarning={true} spellCheck={false} className={classes} style={fontStyle}>{text}</span>
      </div>
    );
  }
}

export default Font;
