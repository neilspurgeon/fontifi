// 'use strict';
const app = require('./app');

// Set port and listen
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});