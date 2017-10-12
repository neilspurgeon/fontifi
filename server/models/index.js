const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.load();

// Connect to mlab
const mongoDB = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds119223.mlab.com:19223/findafont';

mongoose.connect(mongoDB, {
  useMongoClient: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Error'));

module.exports.Fonts = require('./font');
module.exports.Users = require('./user.js');