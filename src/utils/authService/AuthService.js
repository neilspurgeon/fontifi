import decode from 'jwt-decode';
import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'Pt24k2F2XmSy7R8uq9yeayKSUdt4n3zc';
const CLIENT_DOMAIN = 'neilspurgeon.auth0.com';
const REDIRECT = 'http://localhost:3000/callback';
const SCOPE = 'YOUR_SCOPE';
const AUDIENCE = 'http://fontifi.co';



export function login() {
  // lock.show();
}

export function isAuthenticated() {
  return true;
}

export function logout() {

}