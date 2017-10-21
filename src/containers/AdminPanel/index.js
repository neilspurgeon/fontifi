import React from 'react';

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
      <div>
        <h1>Font List</h1>
          <div>
            { this.state.fontList.map((obj, index) => {
              return (<div>{obj.fontFamily}</div>);
            })}
          </div>
      </div>
    );
  }
}

export default AdminPanel;
