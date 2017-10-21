import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import WebFont from 'webfontloader';

class FontListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      // Set initial state.
      // We want this change indepently of parent state to allow editing.
      fontFamily: props.fontFamily,
      fontPairs: props.fontPairs
    };
  }

  componentDidMount() {
    const fonts = this.getFontNames();
    this.loadFonts(fonts);
  }

  getFontNames = () => {
    const fontPairs = this.state.fontPairs;
    // Create font name array of main font + font pairs
    const fontNames = [this.state.fontFamily];

    for (let i=0; i<fontPairs.length; i++) {
      let font = fontPairs[0].fontFamily;
      fontNames.push(font);
    }
    return fontNames;
  }

  loadFonts = (fontsArr) => {
    WebFont.load({
      google: {
        families: fontsArr
      }
    });
  }

  render() {
    let containerClasses = ClassNames(styles.container, {[styles.isActive] : this.state.isActive === true});
    let fontStyle = {
      fontFamily: this.state.fontFamily
    };

    return (
      <div className={containerClasses}>
        <h2 style={fontStyle} className={styles.fontFamilyName}>
          {this.state.fontFamily}
        </h2>
        {this.state.fontPairs ? this.state.fontPairs.map((f, index) => {
          return (
            <div className={styles.fontPair} key={f.fontFamily}>
              <span>{f.fontFamily}</span>
            </div>
          );
        }) : null}
      </div>
    );
  }

};

export default FontListItem;
