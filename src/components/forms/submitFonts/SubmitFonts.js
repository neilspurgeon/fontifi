import {isLoggedIn} from 'utils/authService/AuthService.js';

function SubmitFonts(e) {
  e.preventDefault();
  console.log('submitting fonts...');

  if (isLoggedIn()) {
    return console.log('logged in');
  }
  return console.log('log in required');
}

export default SubmitFonts;