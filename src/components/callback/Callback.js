import React from 'react';
import Auth from 'utils/authService/AuthService.js';

class Callback extends React.Component {

  componentDidMount() {
    const auth = new Auth();
    auth.handleAuthentication();
    window.location.href = "/";
  }

  render() {
    return null;
  }
}

export default Callback;