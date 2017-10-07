import React, { Component } from 'react';
import styles from './style.css';
import SelectFont from 'components/forms/selectFont';
import ComboSlider from 'components/forms/comboSlider';
import ColorPicker from 'components/forms/colorPicker';
import FormField from 'components/forms/formField';
import SubmitFonts from 'components/forms/submitFonts';
import SelectWeight from 'components/forms/selectWeight';

class FontControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: {variants: ['']},
      body: {variants: ['']}
    };
  }

  componentWillReceiveProps(nextProps) {
    const fontList = nextProps.fontList;
    const headingFamily = nextProps.heading.fontFamily;
    const bodyFamily = nextProps.body.fontFamily;

    this.setFont('heading', headingFamily, fontList);
    this.setFont('body', bodyFamily, fontList);
  }

  setFont(fontType, fontFamily, fontList) {
    const font = fontList.find((obj) => {
      return obj.family === fontFamily;
    });
    this.setState({
      [fontType]: font
    });
  }

  render() {

    return (
      <div className={styles.ControlPanel}>

        <form>

          <FormField labelText="Font Family" input={
            <SelectFont
              handleChange={this.props.handleChange.bind(this, this.props.activeFontType, 'fontFamily')}
              value={this.props.activeFontType === 'heading' ? this.props.heading.fontFamily : this.props.body.fontFamily}
              options={this.props.fontList}
              keyValue='family'
            />
          }/>

          <FormField labelText="Font Weight" input={
            <SelectWeight
              handleChange={this.props.handleChange.bind(this, this.props.activeFontType, 'fontWeight')}
              value={this.props.activeFontType === 'heading' ? this.props.heading.fontWeight : this.props.body.fontWeight}
              options={this.state[this.props.activeFontType].variants}
              setFontValue={this.props.setFontValue.bind(this, this.props.activeFontType, 'fontWeight')}
            />
          }/>

          <FormField labelText="Font Size" input={
            <ComboSlider
              handleChange={this.props.handleChange.bind(this, this.props.activeFontType, 'fontSize')}
              min="14"
              max="100"
              step="1"
              value={this.props.activeFontType === 'heading' ? this.props.heading.fontSize : this.props.body.fontSize}
              setFontValue={this.props.setFontValue.bind(this, this.props.activeFontType, 'fontSize')}
            />
          }/>


          <FormField labelText="Letter Spacing" input={
            <ComboSlider
              handleChange={this.props.handleChange.bind(this, this.props.activeFontType, 'letterSpacing')}
              min="-0.05"
              max=".2"
              step=".01"
              value={this.props.activeFontType === 'heading' ? this.props.heading.letterSpacing : this.props.body.letterSpacing}
              setFontValue={this.props.setFontValue.bind(this, this.props.activeFontType, 'letterSpacing')}
            />
          }/>

          <FormField labelText="Color" input={
            <ColorPicker
              handleChange={this.props.handleChange.bind(this, this.props.activeFontType, 'color')}
              value={this.props.activeFontType === 'heading' ? this.props.heading.color : this.props.body.color}
            />
          }/>

          <FormField labelText="Line Height" input={
            <ComboSlider
              handleChange={this.props.handleChange.bind(this, this.props.activeFontType, 'lineHeight')}
              min="1"
              max="3"
              step=".1"
              value={this.props.activeFontType === 'heading' ? this.props.heading.lineHeight : this.props.body.lineHeight}
              setFontValue={this.props.setFontValue.bind(this, this.props.activeFontType, 'lineHeight')}
            />
          }/>

          <div className={styles.BottomActions}>
            <SubmitFonts onSubmit={this.props.onSubmit} />
          </div>

        </form>
      </div>
    );
  }
};

export default FontControls;