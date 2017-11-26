import React, { Component } from 'react';
import Navigation from 'containers/navigation';
import styles from './style.css';

class About extends Component {
  render() {
    return(

        <div className={styles.content}>
          <Navigation />
          <h1 className={styles.h1}>This site is an ongoing side project, designed and developed by <a href="http://neilspurgeon.com/">Neil Spurgeon</a>.</h1>
        </div>
    );
  }
}

export default About;