import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'neilspurgeon.auth0.com',
    clientID: 'Rh9DN85Fd5FFhM037ZE0IGegzk33y46Q',
    redirectUri: 'http://localhost:3000/callback',
    audience: `http://fontifi.co`,
    responseType: 'token id_token'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.signupAndContinue = this.signupAndContinue.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login(username, password, successCallback) {
    this.auth0.client.login(
      { realm: 'Username-Password-Authentication', username, password },
      (err, authResult) => {
        if (err) {
          console.log(err);
          alert(`Error: ${err.description}. Check the console for further details.`);
          return;
        }
        console.log(authResult);
        this.setSession(authResult);
        if (successCallback) {
          successCallback();
        };
      }
    );
  }

  signupAndContinue(email, password, errorCallback, successCallback) {
    this.auth0.signupAndAuthorize(
      { connection: 'Username-Password-Authentication', email, password },
      (err, authResult) => {
        if (err) {
          console.log(err.description);
          return errorCallback(err.description);
        }
        this.setSession(authResult);
        if (successCallback) {
          successCallback();
        };
      }
    );
  }

  signupAndRedirect(email, password, errorCallback, successCallback) {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password
    }, function(err) {
        if (err) {
          console.log(err.description);
          return errorCallback(err.description);
        }
    });
  }

  loginWithGoogle() {
    this.auth0.authorize({ connection: 'google-oauth2' });
  }

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
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
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