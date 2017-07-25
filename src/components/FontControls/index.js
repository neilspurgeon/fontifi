import React, { Component } from 'react';
import styles from './style.css';

class FontControls extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      activeFont: 'heading'
    };
  }

  render() {
    return (
      <div className={styles.ControlPanel}>
        <p>{this.props.heading.fontFamily}</p>
        <form>
          <input onChange={this.props.handleChange.bind(this, 'heading', 'fontFamily')} />
        </form>
      </div>
    );
  }
};

export default FontControls;