const express = require('express');
const db = require('./models');
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('./config/passport');
const passport = require('passport');

// Require Controllers
const FontPairController = require('./controllers/fontPairController');
const AuthenticationController = require('./controllers/authenticationControll');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  const apiRoutes = express.Router(),
        authRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);

  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);
  authRoutes.post('/fontpairs', requireAuth, FontPairController.createFontPair);
  authRoutes.post('/mycollection', requireAuth, FontPairController.createFontPair);

  app.use('/api', apiRoutes);


  app.get('/fontpairs/random', (req, res) => {
    db.FontPair.random( (err, fontPair) => {
      if (err) {
        return res.status(400).json({error: err});
      }
      res.json(fontPair);
    });
  });

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