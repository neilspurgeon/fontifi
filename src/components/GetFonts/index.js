import React, { Component } from 'react';

class GetFonts extends Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    return(
      <p>Press <button onClick={this.props.triggerUpdateFonts}>Spacebar</button> to load new fonts</p>
    );
  }
}

export default GetFonts;