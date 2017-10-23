import React, { Component } from 'react';
import ClassNames from 'classnames';
import styles from './style.css';
import HeadingFont from 'components/HeadingFont';
import BodyFont from 'components/BodyFont';
import GetFonts from 'components/GetFonts';
import FontControls from 'components/FontControls';
import Navigation from 'containers/navigation';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      heading: {
        font: {
          family: 'Poppins',
          variants: ['regular']
        },
        fontWeight: 200,
        fontSize: 50,
        lineHeight: 1.3,
        letterSpacing: 0,
        color: '#333'
      },
      body: {
        font: {
          family: 'Poppins',
          variants: ['regular']
        },
        fontWeight: 'regular',
        fontSize: 18,
        lineHeight: 1.8,
        letterSpacing: 0.01,
        color: '#444'
      },
      fontList: [
        // Default fonts to prevent undefined state
        {
          family: 'Poppins',
          variants: ['Regular']
        }, {
          family: 'Open Sans',
          variants: ['Regular']
        }
      ],
      controlsOpen: true,
      activeFontType: 'heading',
      modalOpen: false
    };
    this.updateFonts = this.updateFonts.bind(this);
    this.handleControlsOpen = this.handleControlsOpen.bind(this);
    this.handleFontChange = this.handleFontChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.saveFonts = this.saveFonts.bind(this);
    this.handleFontType = this.handleFontType.bind(this);
    this.handleFontTypeEvent = this.handleFontTypeEvent.bind(this);
    this.setFontValue = this.setFontValue.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.notifySaveSuccess = this.notifySaveSuccess.bind(this);
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);

    fetch('/fonts')
      .then((response) => {
        return response.json();
      })
      .then((parsedData) => {
        this.setState({
          fontList: parsedData,
        });
        this.setFont('heading', this.state.heading.font.family, parsedData);
        this.setFont('body', this.state.body.font.family, parsedData);
      });
  }

  setFont(fontType, family, fontList) {
    const fontObj = fontList.find((obj) => {
      return obj.family === family;
    });
    const fontTypeObj = this.state[fontType];
    fontTypeObj['font'] = fontObj;

    this.setState({
      [fontType]: fontTypeObj
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    const el = document.activeElement;

    if (el.tagName !== 'INPUT' && el.isContentEditable !== true && e.code === 'Space') {
      this.updateFonts();
    }
  }

  getRandomFont(fontType) {
    const fontArr = this.state.fontList;
    const randomIndex = Math.floor(Math.random()*fontArr.length);
    const randomFont = fontArr[randomIndex];

    // Recursively run function if random font is the same as current
    if (randomFont.family === this.state[fontType].font.family) {
      return this.getRandomFont(fontType);
    };

    if (fontType === 'body' && randomFont.category === 'Display') {
      return this.getRandomFont();
    };
    console.log(randomFont);
    return randomFont;
  }

  updateFonts() {
    const headingObj = this.state.heading;
    headingObj['font'] = this.getRandomFont('heading');

    const bodyObj = this.state.body;
    bodyObj['font'] = this.getRandomFont('body');

    this.setState({
      heading: headingObj,
      body: bodyObj
    });
  }

  reloadState() {
    if (sessionStorage.state) {
      const prevState = JSON.parse(sessionStorage.state);
      this.setState(prevState);
    }
  }

  componentWillMount() {
    this.reloadState();
  }

  setFontValue(fontType, propertyName, value) {
    // fontType: 'heading' or 'body'
    const font = this.state[fontType];

    font[propertyName] = value;

    this.setState({
      [fontType]: font,
      activeFontType: fontType
    });

    // Store state in session to save on reload
    sessionStorage.setItem("state", JSON.stringify(this.state));
  }

  handleFontChange(fontType, propertyName, event) {
    // fontType: 'heading' or 'body'
    let newValue = event.target.value;

    if (event.target.type === 'number' || event.target.type === 'range') {
      // convert string to integer
      newValue = Number(event.target.value);
      this.setFontValue(fontType, propertyName, newValue);

    } else if (propertyName === 'font') {

      // Make sure set fontweight is available
      const currWeight = this.state[fontType].fontWeight;
      const newFont = JSON.parse(newValue);
      const hasWeight = newFont.variants.find((el) => {
        return el === currWeight;
      });

      if (!hasWeight) {
        // set to new font weight if not available
        this.setFontValue(fontType, 'fontWeight', newFont.variants[0]);
      }

      this.setFontValue(fontType, propertyName, newFont);

    } else {
      this.setFontValue(fontType, propertyName, newValue);
    }
  }

  handleControlsOpen() {
    this.setState({
      controlsOpen: !this.state.controlsOpen
    });
  }

  handleFontType(fontType) {
    this.setState({
      activeFontType: fontType,
      controlsOpen: true
    });
  }

  handleFontTypeEvent(event) {
    this.setState({
      activeFontType: event.target.value
    });
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  saveFonts() {
    const heading = this.state.heading;
    const body = this.state.body;

    fetch('/api/auth/mycollection', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        heading: {
          fontFamily: heading.font.family,
          fontWeight: heading.fontWeight,
          fontSize: heading.fontSize,
          letterSpacing: heading.letterSpacing,
          lineHeight: heading.lineHeight,
          color: heading.color
        },
        body: {
          fontFamily: body.font.family,
          fontWeight: body.fontWeight,
          fontSize: body.fontSize,
          letterSpacing: body.letterSpacing,
          lineHeight: body.lineHeight,
          color: body.color
        }
      })
    }).then((res) => {
      this.notifySaveSuccess();
    });
  }

  notifySaveSuccess () {
    console.log('saved');
  }

  render() {
    let contentClassnames = ClassNames(styles.content, {[styles.isOpen] : this.state.controlsOpen});
    let controlsClassnames = ClassNames(styles.controls, {[styles.isOpen] : this.state.controlsOpen});

    return (
      <div>

        <Navigation />

          <div className={contentClassnames}>
            <div className={styles.fonts}>
              <HeadingFont
                fontFamily={this.state.heading.font.family}
                fontSize={this.state.heading.fontSize}
                fontWeight={this.state.heading.fontWeight}
                letterSpacing={this.state.heading.letterSpacing}
                color={this.state.heading.color}
                lineHeight={this.state.heading.lineHeight}
                onFocus={this.handleFontType.bind(this, 'heading')}
                activeFontType={this.state.activeFontType}
              />
              <BodyFont
                fontFamily={this.state.body.font.family}
                fontSize={this.state.body.fontSize}
                fontWeight={this.state.body.fontWeight}
                letterSpacing={this.state.body.letterSpacing}
                color={this.state.body.color}
                lineHeight={this.state.body.lineHeight}
                onFocus={this.handleFontType.bind(this, 'body')}
                activeFontType={this.state.activeFontType}
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
              onSubmit={this.saveFonts}
              handleFontType={this.handleFontTypeEvent}
              setFontValue={this.setFontValue}
              fontList={this.state.fontList}
            />

          </div>

      </div>
    );
  }
}

export default App;