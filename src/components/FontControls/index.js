import React, { Component } from 'react';
import styles from './style.css';

class FontControls extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      activeFont: 'heading'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      activeFont: event.target.value
    });
  }

  getFontList() {
    console.log('getting fonts...');
    fetch('/fonts')
      .then((response) => {
        return response.json();
      })
      .then((parsedData) => {
        console.log(parsedData);
      });
  }

  render() {
    return (
      <div className={styles.ControlPanel}>
        <p>{this.props.heading.fontFamily}</p>
        <form>
          <div>
            <label>
              <input type="radio" name="fontType" value="heading" onChange={this.handleChange} checked={this.state.activeFont === 'heading'} />
              Heading
            </label>

            <label>
              <input type="radio" name="fontType" value="body" onChange={this.handleChange} checked={this.state.activeFont === 'body'} />
              body
            </label>
          </div>

          <input onChange={this.props.handleChange.bind(this, this.state.activeFont, 'fontFamily')}
          value={this.state.activeFont === 'heading' ? this.props.heading.fontFamily :this.props.body.fontFamily }/>

          <select>
            {this.getFontList()}
          </select>

        </form>
      </div>
    );
  }
};

export default FontControls;