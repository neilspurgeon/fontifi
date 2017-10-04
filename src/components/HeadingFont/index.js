import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import WebFont from 'webfontloader';


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
    WebFont.load({
      google: {
        families: [nextProps.fontFamily + ':' + nextProps.fontWeight]
      },
      loading: this.hide(),
      active: this.reveal()
    });
  }

  hide = () => {
    this.setState({
      isLoading: true
    });
  };

  reveal = () => {
    this.setState({
      isLoading: false
    });
  };


  render() {
    let headingClasses = ClassNames(styles.heading, {[styles.isActive] : this.props.activeFontType === 'heading'});

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
        <h1 onFocus={this.props.onFocus} contentEditable="true" spellCheck="false" className={headingClasses} style={fontStyle}>{this.props.text || 'Heading Font'}</h1>
      </div>
    );
  }
}

export default HeadingFont;