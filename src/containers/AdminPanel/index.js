import React from 'react';
import FontList from 'components/adminPanel/FontList';
import styles from './style.css';
import Header from 'components/adminPanel/Header';

class AdminPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fonts: [],
      availableFonts: []
    };
  }

  componentDidMount = () => {
    this.setFontList();

    fetch('/fontlist')
      .then((response) => {
        return response.json();
      })
      .then((parsedData) => {
        this.setState({
          availableFonts: parsedData.items,
        });
      });
  };

  setFontList = () => {
    fetch('/fonts')
      .then((res) => {
        return res.json();
      })
      .then((parsedFonts) => {
        this.setState({
          fonts: parsedFonts
        });
      });
  };

  render() {
    this.headerTitle = 'Fonts';

    if (this.state.fonts && this.state.fonts.length === 1) {
      this.headerTitle = 'Font';
    };

    if (!this.state.fonts) {
      return (<h1>Empty State</h1>);
    }

    return (
      <div className={styles.mainContent}>
        <Header title={ this.state.fonts.length + ' ' + this.headerTitle} />
        <FontList fonts={this.state.fonts} apiFontList={this.state.availableFonts} />
      </div>
    );
  }
}

export default AdminPanel;
