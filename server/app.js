const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const db = require('./models');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const bodyParser = require('body-parser');
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Require Controllers
const fontPairController = require('./controllers/fontPairController');

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

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes
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

app.post('/fontpairs', authCheck, fontPairController.createFontPair);
app.post('/mycollection', authCheck, fontPairController.createFontPair);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;