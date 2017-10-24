import React from 'react';
import styles from './style.css';
import ClassNames from 'classnames';

class SelectFontDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  };

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let optionsWrapperClasses = ClassNames(
      styles.optionsWrapper,
      {[styles.isOpen] : this.state.isOpen}
    );

    return(
      <div className={styles.selectWrapper}>
        <div
          className={styles.Select}
          onClick={this.toggleOpen}>
          <span className={styles.dropDownLabel}>{this.props.value.family}</span>
        </div>
        <div className={optionsWrapperClasses}>
          {this.props.options.map((font, index) => {
            return (
              <div
                className={styles.option}
                onClick={this.props.handleChange.bind(this, font)}>
                {font.family}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

}

export default SelectFontDropDown;