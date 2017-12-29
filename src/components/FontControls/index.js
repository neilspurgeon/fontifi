import React from 'react';
import styles from './style.css';
import SelectFontDropDown from 'components/forms/SelectFontDropDown';
import ComboSlider from 'components/forms/comboSlider';
import ColorPicker from 'components/forms/colorPicker';
import FormField from 'components/forms/formField';
import SaveFonts from 'components/forms/saveFonts';
import SelectDropDown from 'components/forms/SelectDropDown';
import closeIcon from './close.svg';

const FontControls = (props) => {
    let fontWeights = props[props.activeFontType].font.variants.filter(weight => !weight.match('italic'));
    return (
      <div className={styles.controlPanel}>

        <h2 className={styles.panelTitle}>Editor</h2>

        <img onClick={props.closeControls} className={styles.closeButton} src={closeIcon} alt="close" />

        <form>

          <FormField labelText="Font Family" input={
            <SelectFontDropDown
              onChange={props.onDropDownChange.bind(this, props.activeFontType, 'font')}
              value={props.activeFontType === 'heading' ? props.heading.font : props.body.font}
              loadedFonts={[props.heading.font.family, props.body.font.family]}
              options={props.fontList}
               />
          }/>

          <FormField labelText="Font Weight" input={
            <SelectDropDown
              onChange={props.onDropDownChange.bind(this, props.activeFontType, 'fontWeight')}
              value={props.activeFontType === 'heading' ? props.heading.fontWeight : props.body.fontWeight}
              options={fontWeights}
            />
          }/>

          <FormField labelText="Font Size" input={
            <ComboSlider
              onChange={props.onChange.bind(this, props.activeFontType, 'fontSize')}
              min="14"
              max="100"
              step="1"
              value={props.activeFontType === 'heading' ? props.heading.fontSize : props.body.fontSize}
              setFontValue={props.setFontValue.bind(this, props.activeFontType, 'fontSize')}
            />
          }/>


          <FormField labelText="Letter Spacing" input={
            <ComboSlider
              onChange={props.onChange.bind(this, props.activeFontType, 'letterSpacing')}
              min="-0.05"
              max=".2"
              step=".01"
              value={props.activeFontType === 'heading' ? props.heading.letterSpacing : props.body.letterSpacing}
              setFontValue={props.setFontValue.bind(this, props.activeFontType, 'letterSpacing')}
            />
          }/>

          <FormField labelText="Line Height" input={
            <ComboSlider
              onChange={props.onChange.bind(this, props.activeFontType, 'lineHeight')}
              min="1"
              max="3"
              step=".1"
              value={props.activeFontType === 'heading' ? props.heading.lineHeight : props.body.lineHeight}
              setFontValue={props.setFontValue.bind(this, props.activeFontType, 'lineHeight')}
            />
          }/>

          <FormField labelText="Color" input={
            <ColorPicker
              onColorPickerChange={props.onColorPickerChange}
              onInputChange={props.onChange.bind(this, props.activeFontType, 'color')}
              color={props.activeFontType === 'heading' ? props.heading.color : props.body.color}
            />
          }/>

          <div className={styles.bottomActions}>
            <SaveFonts onSubmit={props.onSubmit} />
          </div>

        </form>
      </div>
    );
};

export default FontControls;
