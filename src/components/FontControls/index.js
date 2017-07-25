import React, { Component } from 'react';
import styles from './style.css';

class FontControls extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      activeFont: 'heading',
      fontList: ['fontlist']
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/fonts')
      .then((response) => {
        return response.json();
      })
      .then((parsedData) => {
        this.setState({
          fontList: parsedData.items
        });
        console.log(parsedData.items[1].family);
      });
  };

  handleChange(event) {
    this.setState({
      activeFont: event.target.value
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

          <select onChange={this.props.handleChange.bind(this, this.state.activeFont, 'fontFamily')} value={this.state.activeFont === 'heading' ? this.props.heading.fontFamily :this.props.body.fontFamily}>
            { this.state.fontList.map((fontObj) => {
              return <option value={fontObj.family}>{fontObj.family}</option>;
            })}
          </select>

        </form>

      </div>
    );
  }
};

export default FontControls;