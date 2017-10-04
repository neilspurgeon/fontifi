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
    this.submitFonts = this.submitFonts.bind(this);
    this.handleFontType = this.handleFontType.bind(this);
    this.handleFontTypeEvent = this.handleFontTypeEvent.bind(this);
    this.setFontValue = this.setFontValue.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);

    fetch('/fonts')
      .then((response) => {
        return response.json();
      })
      .then((parsedData) => {
        this.setState({
          fontList: parsedData.items,
        });
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

  updateFonts() {
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

    } else if (propertyName === 'fontFamily') {
      // Make sure set fontweight is available
      var availWeights = this.state.fontList;
      var currWeight = this.state[fontType];

      console.log('Font Family Change:' + '');
      this.setFontValue(fontType, propertyName, newValue);

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

  submitFonts() {
    console.log('submiting fonts...');
    fetch('/fontpairs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        heading: this.state.heading,
        body: this.state.body,
      })
    });
  }

  render() {
    let contentClassnames = ClassNames(styles.content, {[styles.controlsOpen] : this.state.controlsOpen});
    let controlsClassnames = ClassNames(styles.controls, {[styles.controlsOpen] : this.state.controlsOpen});

    return (
      <div>

        <Navigation />

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
                activeFontType={this.state.activeFontType}
              />
              <BodyFont
                fontFamily={this.state.body.fontFamily}
                fontSize={this.state.body.fontSize}
                fontWeight={this.state.body.fontWeight}
                letterSpacing={this.state.body.letterSpacing}
                color={this.state.body.color}
                lineHeight={this.state.body.lineHeight}
                onChange={this.handleFontChange.bind(this, 'body', 'text')}
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
              onSubmit={this.submitFonts}
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