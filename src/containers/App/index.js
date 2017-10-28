import React from 'react';
import ClassNames from 'classnames';
import styles from './style.css';
import HeadingFont from 'components/HeadingFont';
import BodyFont from 'components/BodyFont';
import GetFonts from 'components/GetFonts';
import FontControls from 'components/FontControls';
import Navigation from 'containers/navigation';

class App extends React.Component {

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
        color: {
          rgba: {
            r: 51,
            g: 51,
            b: 51,
            a: 1
          },
          hex: '#333'
        },
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
        color: {
          rgba: {
            r: 51,
            g: 51,
            b: 51,
            a: 1
          },
          hex: '#333'
        },
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
      editorIsOpen: true,
      activeFontType: 'heading',
      modalOpen: false
    };
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);

    fetch('/fonts')
      .then((response) => {
        return response.json();
      })
      .then((parsedData) => {
        this.setState({ fontList: parsedData });
        this.setFont('heading', this.state.heading.font.family, parsedData);
        this.setFont('body', this.state.body.font.family, parsedData);
      });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  setFont = (fontType, family, fontList) => {
    const fontObj = fontList.find((obj) => {
      return obj.family === family;
    });
    const fontTypeObj = this.state[fontType];
    fontTypeObj['font'] = fontObj;

    this.setState({ [fontType]: fontTypeObj });
  }

  handleKeyPress = (e) => {
    const el = document.activeElement;

    if (el.tagName !== 'INPUT' && el.isContentEditable !== true && e.code === 'Space') {
      this.updateFonts();
    }
  }

  getRandomFont = (fontType) => {
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
    return randomFont;
  }

  updateFonts = () => {
    const headingObj = this.state.heading;
    headingObj['font'] = this.getRandomFont('heading');

    const bodyObj = this.state.body;
    bodyObj['font'] = this.getRandomFont('body');

    this.setState({
      heading: headingObj,
      body: bodyObj
    });
  }

  reloadState = () => {
    if (sessionStorage.state) {
      const prevState = JSON.parse(sessionStorage.state);
      this.setState(prevState);
    }
  }

  componentWillMount = () => {
    this.reloadState();
  }

  setFontValue = (fontType, propertyName, value) => {
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

  handleColorPickerChange = (rgba, hex) => {
    const colorValue = { rgba: rgba, hex: hex };
    const fontType = this.state.activeFontType;
    this.setFontValue(fontType, 'color', colorValue);
  }

  handleChange = (property, value) => {
    const fontType = this.state.activeFontType;
    this.setFontValue(fontType, property, value);
  }

  handleDropDownChange = (fontType, propertyName, value) => {
    if (propertyName === 'font') {

      // Make sure set fontweight is available
      const newFont = value;
      const currWeight = this.state[fontType].fontWeight;
      const hasWeight = newFont.variants.find((el) => {
        return el === currWeight;
      });

      if (!hasWeight) {
        // set to new font weight if not available
        return this.setFontValue(fontType, 'fontWeight', newFont.variants[0]);
      }
      return this.setFontValue(fontType, propertyName, newFont);
    }

    this.setFontValue(fontType, propertyName, value);
  }

  handleFontChange = (fontType, propertyName, event) => {
    // fontType: 'heading' or 'body'
    let newValue = event.target.value;

    if (event.target.type === 'number' || event.target.type === 'range') {
      // convert string to integer
      newValue = Number(event.target.value);
      this.setFontValue(fontType, propertyName, newValue);

    } else if (propertyName === 'font') {

      // Make sure set fontweight is available
      const currWeight = this.state[fontType].fontWeight;
      const newFont = newValue;
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

  handleCloseEditor = () => {
    this.setState({ editorIsOpen: false });
  }

  handleSetActiveFontType = (fontType) => {
    this.setState({
      activeFontType: fontType,
      editorIsOpen: true
    });
  }

  saveFonts = () => {
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

  notifySaveSuccess = () => {
    console.log('saved');
  }

  render() {
    let contentClassnames = ClassNames(styles.content, {[styles.isOpen] : this.state.editorIsOpen});
    let controlsClassnames = ClassNames(styles.controls, {[styles.isOpen] : this.state.editorIsOpen});

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
                onFocus={this.handleSetActiveFontType.bind(this, 'heading')}
                activeFontType={this.state.activeFontType}
              />
              <BodyFont
                fontFamily={this.state.body.font.family}
                fontSize={this.state.body.fontSize}
                fontWeight={this.state.body.fontWeight}
                letterSpacing={this.state.body.letterSpacing}
                color={this.state.body.color}
                lineHeight={this.state.body.lineHeight}
                onFocus={this.handleSetActiveFontType.bind(this, 'body')}
                activeFontType={this.state.activeFontType}
              />
              <GetFonts triggerUpdateFonts={this.updateFonts} className={styles.getFonts}/>
            </div>
          </div>

          <div className={controlsClassnames}>
            <FontControls
              onColorPickerChange={this.handleChange}
              onDropDownChange={this.handleDropDownChange}
              heading={this.state.heading}
              body={this.state.body}
              onChange={this.handleFontChange}
              closeControls={this.handleCloseEditor}
              activeFontType={this.state.activeFontType}
              onSubmit={this.saveFonts}
              setFontValue={this.setFontValue}
              fontList={this.state.fontList}
            />
          </div>

      </div>
    );
  }
}

export default App;