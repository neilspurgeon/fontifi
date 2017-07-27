import React, { Component } from 'react';
import styles from './style.css';
import SelectFont from 'components/forms/SelectFont';
import Select from 'components/forms/Select';
import Slider from 'components/forms/Slider';

class FontControls extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      fontController: 'heading',
      heading: {variants: ['headingnone']},
      body: {variants: ['bodynone']},
      activeFontIndex: 0,
      activeFontWeights: ['font weights'],
      fontList: [{"variants": ['Regular']}],
    };

    this.handleFontController = this.handleFontController.bind(this);
    this.fontSizes = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 36, 48, 64, 72, 144, 288];
  }

  componentDidMount() {
    fetch('/fonts')
      .then((response) => {
        return response.json();
      })
      .then((parsedData) => {
        this.setState({
          fontList: parsedData.items,
        });
        this.setFont('heading', this.props.heading.fontFamily);
        this.setFont('body', this.props.body.fontFamily);
      });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.heading) {
      this.setFont('heading', nextProps.heading.fontFamily);
    }
    if (nextProps.body) {
      this.setFont('body', nextProps.body.fontFamily);
    }
  }

  setFont(fontType, fontFamily) {
    const fontList = this.state.fontList;
    const font = fontList.find((obj) => {
      return obj.family === fontFamily;
    });
    this.setState({
      [fontType]: font
    });
  }

  handleFontController(event) {
    this.setState({
      fontController: event.target.value
    });
  }

  render() {
    return (
      <div className={styles.ControlPanel}>

        <form>
          <div>
            <label>
              <input
                type="radio"
                name="fontType"
                value="heading"
                onChange={this.handleFontController}
                checked={this.state.fontController === 'heading'} />
              Heading
            </label>

            <label>
              <input
                type="radio"
                name="fontType"
                value="body"
                onChange={this.handleFontController}
                checked={this.state.fontController === 'body'} />
              body
            </label>
          </div>

          <SelectFont
            handleChange={this.props.handleChange.bind(this, this.state.fontController, 'fontFamily')}
            value={this.state.fontController === 'heading' ? this.props.heading.fontFamily : this.props.body.fontFamily}
            options={this.state.fontList}
            keyValue='family'
          />

          <Select
            handleChange={this.props.handleChange.bind(this, this.state.fontController, 'fontWeight')}
            value={this.state.fontController === 'heading' ? this.props.heading.fontWeight : this.props.body.fontWeight}
            options={this.state[this.state.fontController].variants}
          />

          <Slider
            handleChange={this.props.handleChange.bind(this, this.state.fontController, 'fontSize')}
            min="10"
            max="144"
            step="1"
            value={this.state.fontController === 'heading' ? this.props.heading.fontSize : this.props.body.fontSize}
          />

          <Slider
            handleChange={this.props.handleChange.bind(this, this.state.fontController, 'letterSpacing')}
            min="-0.05"
            max=".2"
            step=".01"
            value={this.state.fontController === 'heading' ? this.props.heading.letterSpacing : this.props.body.letterSpacing}
          />

          <p>Value: {this.state.fontController === 'heading' ? this.props.heading.fontSize : this.props.body.fontSize}</p>

        </form>

      </div>
    );
  }
};

export default FontControls;