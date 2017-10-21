import React from 'react';
import FontListItem from 'components/adminPanel/FontListItem';
import styles from './style.css';

class AdminPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontList: ['asdasd']
    };
  }

  componentDidMount = () => {
    this.setFontList();
  };

  setFontList = () => {
    fetch('/fonts')
      .then((res) => {
        return res.json();
      })
      .then((parsedFonts) => {
        this.setState({
          fontList: parsedFonts
        });
      });
  };

  render() {
    if (!this.state) {
      return (<h1>Empty State</h1>);
    }
    return (
      <div className={styles.mainContent}>
        <h1>Font List</h1>
        <div>
          { this.state.fontList.map((font, index) => {
            return (
              <FontListItem
                fontFamily={'poppins'}
                fontPairs={font.fontPairs}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default AdminPanel;
