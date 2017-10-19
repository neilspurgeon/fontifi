const express = require('express');
const db = require('./models');
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('./config/passport');
const passport = require('passport');
const ConnectRoles = require('connect-roles');

const user = new ConnectRoles({
  failureHandler: function (req, res, action) {
      // optional function to customise code that runs when
      // user fails authorisation
      var accept = req.headers.accept || '';
      res.status(403);
      if (~accept.indexOf('html')) {
        res.render('access-denied', {action: action});
      } else {
        res.send('Access Denied - You don\'t have permission to: ' + action);
      }
    }
});

// // Setup user roles
// user.use('access admin panel', (req) => {
//   console.log(req.user);
//   if (req.user.role === 'admin') {
//     return true;
//   }
// });

// Require Controllers
const AuthenticationController = require('./controllers/authenticationController');
const UserController = require('./controllers/userController');
const FontController = require('./controllers/fontController');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  const apiRoutes = express.Router(),
        authRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);
  // authRoutes.use(AuthenticationController.middleWare);

  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);
  authRoutes.post('/mycollection', requireAuth, UserController.createFontPair);
  authRoutes.get('/mycollection', requireAuth, UserController.getFonts);
  authRoutes.delete('/mycollection', requireAuth, UserController.deleteFont);

  app.post('/fonts', requireAuth, FontController.createFont);

  app.use('/api', apiRoutes);


  app.get('/fonts/random', (req, res) => {
    db.Fonts.random( (err, fontPair) => {
      if (err) {
        return res.status(400).json({error: err});
      }
      res.json(fontPair);
    });
  });

  app.get('/admin/fonts', FontController.getFonts);

  app.get('/fonts', (req, res) => {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + process.env.GOOGLE_FONTS_KEY )
      .then((fonts) => {
        return fonts.json();
      })
      .then((parsedData) => {
        res.json(parsedData);
      });
  });
};