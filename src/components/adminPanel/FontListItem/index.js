import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';
import WebFont from 'webfontloader';

class FontListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  };

  componentDidMount() {
    WebFont.load({
      google: {
        families: [this.props.fontFamily]
      }
    });
  }

  render() {
    let containerClasses = ClassNames(styles.container, {[styles.isActive] : this.props.isActive === true});
    let fontPairs = this.props.fontPairs;

    const fontStyle = {
      fontFamily: this.props.fontFamily,
    };

    return (
      <div className={containerClasses} >
        <h2 style={fontStyle} className={styles.fontFamilyName}>{this.props.fontFamily}</h2>
        {fontPairs ? fontPairs.map((font, index) => {
          return (
            <div className={styles.fontPair}>
              <span>{font.fontFamily}</span>
            </div>
          );
        }) : null}
      </div>
    );
  }
}

export default FontListItem;
