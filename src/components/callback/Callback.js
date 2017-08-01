import React, { Component } from 'react';
import { setIdToken, setAccessToken } from 'utils/authService/AuthService.js';

class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    window.location.href = "/";
  }

  render() {
    return null;
  }
}

export default Callback;