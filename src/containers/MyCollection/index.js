import React, { Component } from 'react';
import Navigation from 'containers/navigation';
import graphic from './empty-folder.svg';
import styles from './style.css';
import Auth from 'utils/authService/AuthService.js';
import config from 'config.js';
import WebFont from 'webfontloader';
import trashIcon from './trash-icon.svg';

class MyCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedFonts: []
    };
  }

  componentDidMount() {
    const auth = new Auth();
    if (auth.isAuthenticated()) {
      this.getSavedFonts();
    }
  }

  getSavedFonts = () => {
    fetch('/api/auth/mycollection', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((res) => {
      return res.json();
    }).then((json) => {
      this.setState({
        savedFonts: json
      });
      this.loadFonts(this.state.savedFonts);
    });
  }

  loadFonts = (savedFonts) => {
    const fontsArr = [];

    savedFonts.map((obj, key) => {
      const heading = obj.heading.fontFamily + ':' + obj.heading.fontWeight;
      const body = obj.body.fontFamily + ':' + obj.body.fontWeight;
      return fontsArr.push(heading) && fontsArr.push(body);
    });

    WebFont.load({
      google: {
        families: fontsArr
      }
    });
  }

  render() {

    if (this.state.savedFonts[0]) {
      return (
        <div className={styles.content}>

          <Navigation />

          <div className={styles.savedFontsContainer}>
            { this.state.savedFonts.map((obj, index) => {
              const heading = obj.heading;
              const body = obj.body;
              const headingStyle = {
                fontFamily: heading.fontFamily,
                fontWeight: heading.fontWeight
              };
              const bodyStyle = {
                fontFamily: body.fontFamily,
                fontWeight: body.fontWeight
              };

              return (
                <div className={styles.fontPair} key={index}>
                  <div className={styles.actions}>
                    <a className={styles.delete}><img src={trashIcon} alt="Delete" /></a>
                  </div>
                  <h1 style={headingStyle}>{heading.fontFamily + ' & ' + body.fontFamily}</h1>
                  <p style={bodyStyle}>{config.savedBodyText}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Empty State
    return(
      <div>
        <Navigation />
        <div className={styles.emptyStateContainer}>
          <img src={graphic} className={styles.graphic} alt="Empty Folder" draggable="false" />
          <h1 className={styles.heading}>Nothing to See Here Yet</h1>
          <p className={styles.bodyText}>Start saving your favorite font combinations and they will show up here.</p>
        </div>
      </div>
    );
  }
}

export default MyCollection;