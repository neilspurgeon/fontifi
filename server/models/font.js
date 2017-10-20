const mongoose = require('mongoose');

// Define schema
const fontSchema = new mongoose.Schema({
  fontFamily: {
    type: String,
    required: true,
    unique: true
  },
  fontPairs: [{
    fontFamily: {
      type: String,
      required: true,
      unique: true
    }
  }]
});

// // Return one random document
fontSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

// Create model
const Font = mongoose.model('Font', fontSchema);

// Export model
module.exports = Font;
