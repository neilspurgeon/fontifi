import React, { Component } from 'react';
import styles from './style.css';
import closeSVG from './close.svg';
import SelectFont from 'components/forms/selectFont';
import Select from 'components/forms/select';
import ComboSlider from 'components/forms/comboSlider';
import ColorPicker from 'components/forms/colorPicker';
import PrimaryCta from 'components/forms/primaryCta';
import FormField from 'components/forms/formField';
import SegmentController from 'components/forms/segmentController';

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


        <button onClick={this.props.closeControls} className={styles.closeButton}>
          <img src={closeSVG} alt="close controls"/>
        </button>

        <form>
          <SegmentController
            onChange={this.handleFontController}
            name1="fontType"
            value1="heading"
            checked1={this.state.fontController === 'heading'}
            name2="fontType"
            value2="body"
            checked2={this.state.fontController === 'body'}
          />


          <FormField labelText="Font Family" input={
            <SelectFont
              handleChange={this.props.handleChange.bind(this, this.state.fontController, 'fontFamily')}
              value={this.state.fontController === 'heading' ? this.props.heading.fontFamily : this.props.body.fontFamily}
              options={this.state.fontList}
              keyValue='family'
            />
          }/>

          <FormField labelText="Font Weight" input={
            <Select
              handleChange={this.props.handleChange.bind(this, this.state.fontController, 'fontWeight')}
              value={this.state.fontController === 'heading' ? this.props.heading.fontWeight : this.props.body.fontWeight}
              options={this.state[this.state.fontController].variants}
            />
          }/>

          <FormField labelText="Font Size" input={
            <ComboSlider
              handleChange={this.props.handleChange.bind(this, this.state.fontController, 'fontSize')}
              min="10"
              max="144"
              step="1"
              value={this.state.fontController === 'heading' ? this.props.heading.fontSize : this.props.body.fontSize}
            />
          }/>


          <FormField labelText="Letter Spacing" input={
            <ComboSlider
              handleChange={this.props.handleChange.bind(this, this.state.fontController, 'letterSpacing')}
              min="-0.05"
              max=".2"
              step=".01"
              value={this.state.fontController === 'heading' ? this.props.heading.letterSpacing : this.props.body.letterSpacing}
            />
          }/>

          <FormField labelText="Color" input={
            <ColorPicker
              handleChange={this.props.handleChange.bind(this, this.state.fontController, 'color')}
              value={this.state.fontController === 'heading' ? this.props.heading.color : this.props.body.color}
            />
          }/>

          <FormField labelText="Line Height" input={
            <div>
              <ComboSlider
                handleChange={this.props.handleChange.bind(this, this.state.fontController, 'lineHeight')}
                min="1"
                max="3"
                step=".1"
                value={this.state.fontController === 'heading' ? this.props.heading.lineHeight : this.props.body.lineHeight}
              />
            </div>
          }/>

          <div className={styles.BottomActions}>
            <PrimaryCta />
          </div>

        </form>

      </div>
    );
  }
};

export default FontControls;