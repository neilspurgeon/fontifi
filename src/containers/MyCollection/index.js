import React, { Component } from 'react';
import Navigation from 'containers/navigation';
import graphic from './empty-folder.svg';
import styles from './style.css';

class MyCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedFonts: []
    };
  }

  componentDidMount() {
    fetch('/api/auth/mycollection', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    }).then((res) => {
      return res.json();
    }).then((json) => {
      this.setState({
        savedFonts: json
      });
    });
  }

  render() {
    return(
      <div>
        <Navigation />
        <div className={styles.emptyStateContainer}>
          <img src={graphic} className={styles.graphic} alt="Empty Folder" draggable="false" />
          <h1 className={styles.heading}>Nothing to See Here Yet</h1>
          <p className={styles.bodyText}>Start saving your favorite font combinations and they will show up here.</p>
        </div>
      </div>
    );
  }
}

export default MyCollection;