import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import logo from './findafont-logo.svg';
import controlsIcon from './controls-icon.svg';
import styles from './style.css';

import HeadingFont from 'components/HeadingFont';
import BodyFont from 'components/BodyFont';
import GetFonts from 'components/GetFonts';
import FontControls from 'components/FontControls';

import Auth from 'utils/authService/AuthService.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      heading: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 42,
        lineHeight: 1,
        letterSpacing: 0,
        color: '#333',
        text: 'Heading Font'
      },
      body: {
        fontFamily: 'Open Sans',
        fontWeight: 'regular',
        fontSize: 16,
        lineHeight: 1.4,
        letterSpacing: 0,
        color: '#666'
      },
      controlsOpen: true,
      activeFontType: 'heading'
    };
    this.updateFonts = this.updateFonts.bind(this);
    this.handleControlsOpen = this.handleControlsOpen.bind(this);
    this.handleFontChange = this.handleFontChange.bind(this);
  };

  updateFonts() {
    // this.setState({});
    fetch('/fontpairs/random', {})
      .then( function(response) {
        return response.json();
      })
      .then( (parsedData) => {
        this.setState({
          heading: parsedData.heading,
          body: parsedData.body
        });
      });
  }

  handleFontChange(fontType, propertyName, event) {
    // fontType: 'heading' or 'body'
    const font = this.state[fontType];
    font[propertyName] = event.target.value;
    this.setState({ fontType: font });
  }

  handleControlsOpen() {
    this.setState({
      controlsOpen: !this.state.controlsOpen
    });
  }

  handleFontType(fontType) {
    this.setState({
      activeFontType: fontType
    });
  }

  render() {
    let contentClassnames = ClassNames(styles.content, {[styles.controlsOpen] : this.state.controlsOpen});
    let controlsClassnames = ClassNames(styles.controls, {[styles.controlsOpen] : this.state.controlsOpen});

    return (
      <div>
        <Link to={'/'} className={styles.siteLogo}>
          <img src={logo} alt="findafont logo"/>
        </Link>
        <button onClick={this.handleControlsOpen} className={styles.controlsButton}>
          <img src={controlsIcon} alt="open controls"/>
        </button>

          <div className={contentClassnames}>
            <div className={styles.fonts}>
              <HeadingFont
                fontFamily={this.state.heading.fontFamily}
                fontSize={this.state.heading.fontSize}
                fontWeight={this.state.heading.fontWeight}
                letterSpacing={this.state.heading.letterSpacing}
                color={this.state.heading.color}
                lineHeight={this.state.heading.lineHeight}
                text={this.state.heading.text}
                onChange={this.handleFontChange.bind(this, 'heading', 'text')}
                onFocus={this.handleFontType.bind(this, 'heading')}
              />
              <BodyFont
                fontFamily={this.state.body.fontFamily}
                fontSize={this.state.body.fontSize}
                fontWeight={this.state.body.fontWeight}
                letterSpacing={this.state.body.letterSpacing}
                color={this.state.body.color}
                lineHeight={this.state.body.lineHeight}
                onFocus={this.handleFontType.bind(this, 'body')}
              />
              <GetFonts triggerUpdateFonts={this.updateFonts} className={styles.getFonts}/>
            </div>

          </div>

          <div className={controlsClassnames}>
            <FontControls
              heading={this.state.heading}
              body={this.state.body}
              handleChange={this.handleFontChange}
              closeControls={this.handleControlsOpen}
              activeFontType={this.state.activeFontType}
            />
          </div>

      </div>
    );
  }
}

export default App;