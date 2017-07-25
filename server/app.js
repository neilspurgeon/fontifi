const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const db = require('./models');

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

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

app.post('/fontpairs', (req, res) => {
  // const fontPair = req.body.fontPair;
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;