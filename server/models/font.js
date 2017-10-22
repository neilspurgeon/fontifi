const mongoose = require('mongoose');

// Define schema
const fontSchema = new mongoose.Schema({
  family: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['Member', 'Admin'],
    required: true
  },
  variants: {
    type: Array,
    required: true
  },
  version: String,
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
