const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const db = require('./models');

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
    return res.json(fontPair);
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