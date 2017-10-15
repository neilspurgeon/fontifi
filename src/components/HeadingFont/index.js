import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import WebFont from 'webfontloader';
import config from 'config';

class HeadingFont extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  };

  componentDidMount() {
    WebFont.load({
      google: {
        families: [this.props.fontFamily + ':' + this.props.fontWeight]
      },
      loading: this.hide(),
      active: this.reveal()
    });
  };

  componentWillReceiveProps(nextProps) {
    // Only run if props are different
    if ((nextProps.fontFamily !== this.props.fontFamily) || (nextProps.fontWeight !== this.props.fontWeight)) {
      WebFont.load({
        google: {
          families: [nextProps.fontFamily + ':' + nextProps.fontWeight]
        },
        loading: this.hide(),
        active: this.reveal()
      });
    }
  }

  hide = () => {
    this.setState({
      isLoading: true
    });
  };

  reveal = () => {
    // This is not very accurate way to prevent FOUT but helps in most cases.
    // Need to look into properly hiding the text as soon the font is changed, then showing it once the font web font callback is triggered.
    window.setTimeout( () => {
      this.setState({
        isLoading: false
      });
    }, 200);
  };


  render() {
    let headingClasses = ClassNames(styles.heading, {[styles.isActive] : this.props.activeFontType === 'heading'}, {[styles.isLoading] : this.state.isLoading === true });
    const text = config.defaultHeadingText;

    const fontStyle = {
      fontFamily: this.props.fontFamily,
      fontSize: this.props.fontSize + 'px',
      fontWeight: this.props.fontWeight,
      letterSpacing: this.props.letterSpacing + 'em',
      color: this.props.color,
      lineHeight: this.props.lineHeight
    };

    return (
      <div>
        <h1 onFocus={this.props.onFocus} contentEditable={true} suppressContentEditableWarning={true} spellCheck={false} className={headingClasses} style={fontStyle}>{text}</h1>
      </div>
    );
  }
}

export default HeadingFont;