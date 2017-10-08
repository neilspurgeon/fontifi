const routes  = require('express').Router();
const db = require('./models');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Setup Auth0
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://neilspurgeon.auth0.com/.well-known/jwks.json"
  }),
  audience: process.env.AUTH_AUDIENCE,
  issuer: process.env.AUTH_ISSUER,
  algorithms: ['RS256']
});

// Require Controllers
const fontPairController = require('./controllers/fontPairController');

// Routes
routes.get('/fontpairs/random', (req, res) => {
  db.FontPair.random( (err, fontPair) => {
    if (err) {
      return res.status(400).json({error: err});
    }
    res.json(fontPair);
  });
});

routes.get('/fonts', (req, res) => {
  fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + process.env.GOOGLE_FONTS_KEY )
    .then((fonts) => {
      return fonts.json();
    })
    .then((parsedData) => {
      res.json(parsedData);
    });
});

routes.post('/fontpairs', authCheck, fontPairController.createFontPair);
routes.post('/mycollection', authCheck, fontPairController.createFontPair);


module.exports = routes;