import React, { Component } from 'react';
import Navigation from 'containers/navigation';
import graphic from './empty-folder.svg';
import styles from './style.css';
import Auth from 'utils/authService/AuthService.js';
import config from 'config.js';
import WebFont from 'webfontloader';
import trashIcon from './trash-icon.svg';
// import ClassNames from 'classnames';

class MyCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedFonts: [],
      confirmModalId: null
    };
  }

  componentDidMount() {
    const auth = new Auth();
    if (auth.isAuthenticated()) {
      this.getSavedFonts();
    }
  }

  getSavedFonts = () => {
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
      if(this.state.savedFonts[0]) {
        this.loadFonts(this.state.savedFonts);
      }
    });
  }

  loadFonts = (savedFonts) => {
    const fontsArr = [];

    savedFonts.map((obj, key) => {
      const heading = obj.heading.fontFamily + ':' + obj.heading.fontWeight;
      const body = obj.body.fontFamily + ':' + obj.body.fontWeight;
      return fontsArr.push(heading) && fontsArr.push(body);
    });

    WebFont.load({
      google: {
        families: fontsArr
      }
    });
  }

  openConfirmDelete = (id) => {
    this.setState({
      confirmModalId: id
    });
  }

  closeConfirmDelete = (id) => {
    this.setState({
      confirmModalId: null
    });
  }


  delete = (fontPairId, index) => {
    fetch('/api/auth/mycollection', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        fontId: fontPairId
      })
    })
    .then((err, res) => {
      const savedFontsArr = this.state.savedFonts;
      savedFontsArr.splice(index, 1);

      this.setState({
        savedFonts: savedFontsArr
      });
    });
  }

  render() {
    if (this.state.savedFonts[0]) {
      return (
        <div className={styles.content}>

          <Navigation />

          <div className={styles.savedFontsContainer}>
            { this.state.savedFonts.map((obj, index) => {
              const heading = obj.heading;
              const body = obj.body;
              const headingStyle = {
                fontFamily: heading.fontFamily,
                fontWeight: heading.fontWeight
              };
              const bodyStyle = {
                fontFamily: body.fontFamily,
                fontWeight: body.fontWeight
              };

              return (
                <div className={styles.fontPair} key={obj._id} ref={obj._id}>
                  <div className={this.state.confirmModalId === obj._id ? [styles.confirmDelete, styles.isOpen].join(' ') : styles.confirmDelete} onMouseLeave={this.closeConfirmDelete}>
                    <p className={styles.cofirmDeleteMsg}>Are you sure you want to delete this font pair?</p>
                    <button className={styles.deleteBtn} onClick={() => {this.delete(obj._id, index);}}>Delete</button>
                    <button className={styles.cancelBtn} onClick={this.closeConfirmDelete}>Cancel</button>
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.delete}>
                      <img onClick={() => {this.openConfirmDelete(obj._id);}} src={trashIcon} alt="Delete" />
                    </button>
                  </div>
                  <div className={this.state.confirmModalId === obj._id ? [styles.fontPairInnerContainer, styles.blur].join(' ') : styles.fontPairInnerContainer}>
                    <h1 style={headingStyle}>{heading.fontFamily + ' & ' + body.fontFamily}</h1>
                    <p style={bodyStyle}>{config.savedBodyText}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Empty State
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