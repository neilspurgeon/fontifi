export default class Auth {

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login(email, password, errorCb, successCb) {
    const formData = JSON.stringify({
      email: email,
      password: password
    });

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: formData
    })
    .then((res) => res.json())
    .then((parsedData) => {
      if (parsedData.error) {
        console.log(parsedData.error);
        return errorCb ? errorCb(parsedData.error) : null;
      }
      this.setSession(parsedData);
      return successCb ? successCb() : null;
    })
    .catch((err) => {
      return errorCb ? errorCb('Password is incorrect.') : null;
    });
  };

  signup(email, password, errorCb, successCb) {
    const formData = JSON.stringify({
      email: email,
      password: password
    });

    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: formData
    })
    .then((res) => res.json())
    .then((parsedData) => {
      if (parsedData.error) {
        console.log(parsedData.error);
        return errorCb ? errorCb(parsedData.error) : null;
      }
      this.setSession(parsedData);
      return successCb ? successCb() : null;
    })
    .catch((err) => {
      return errorCb ? errorCb('Something went wrong. Please try again.') : null;
    });
  };

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', authResult.user);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expires_at');
    window.location.href = "/";
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}