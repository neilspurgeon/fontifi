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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: {fontFamily: 'Poppins'},
      body: {fontFamily: 'Open Sans'},
      controlsOpen: true
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


  render() {
    let contentClassnames = ClassNames(styles.content, { [styles.controlsOpen]: this.state.controlsOpen });
    let controlsClassnames = ClassNames(styles.controls, { [styles.controlsOpen]: this.state.controlsOpen });

    return (
      <div>
        <Link to={App} className={styles.siteLogo}>
          <img src={logo} alt="findafont logo"/>
        </Link>
        <button onClick={this.handleControlsOpen} className={styles.controlsButton}>
          <img src={controlsIcon} alt="open/close controls"/>
        </button>

          <div className={contentClassnames}>
            <div className={styles.fonts}>
              <HeadingFont
                fontFamily={this.state.heading.fontFamily}
                fontSize={this.state.heading.fontSize} />
              <BodyFont
                fontFamily={this.state.body.fontFamily}
                fontSize={this.state.body.fontSize} />
            </div>
            <div className={styles.GetFonts}>
              <GetFonts triggerUpdateFonts={this.updateFonts} />
            </div>
          </div>

          <div className={controlsClassnames}>
            <FontControls heading={this.state.heading} body={this.state.body} handleChange={this.handleFontChange}/>
          </div>

      </div>
    );
  }
}

export default App;