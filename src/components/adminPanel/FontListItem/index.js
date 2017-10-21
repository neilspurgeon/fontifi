import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';

class FontListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    let containerClasses = ClassNames(styles.container, {[styles.isActive] : this.props.isActive === true});
    let fontStyle = {
      fontFamily: this.props.fontFamily
    };

    return (
      <div className={containerClasses}>
        <h2 style={fontStyle} className={styles.fontFamilyName}>
          {this.props.fontFamily}
        </h2>
        {this.props.fontPairs ? this.props.fontPairs.map((f, index) => {
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
