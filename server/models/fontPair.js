// const mongoose = require('mongoose');

// // Define schema
// const fontPairSchema = new mongoose.Schema({
//   heading: {
//     fontFamily: String,
//     fontWeight: String,
//     fontSize: Number,
//     letterSpacing: Number,
//     lineHeight: Number,
//     textTransform: String,
//     color: String
//   },
//   body: {
//     fontFamily: String,
//     fontWeight: String,
//     fontSize: Number,
//     letterSpacing: Number,
//     lineHeight: Number,
//     textTransform: String,
//     color: String
//   },
//   createdAt: Date,
//   updatedAt: Date
// });

// // Return one random document
// fontPairSchema.statics.random = function(callback) {
//   this.count(function(err, count) {
//     if (err) {
//       return callback(err);
//     }
//     var rand = Math.floor(Math.random() * count);
//     this.findOne().skip(rand).exec(callback);
//   }.bind(this));
// };

// // Create model
// const FontPair = mongoose.model('FontPair', fontPairSchema);

// // Export model
// module.exports = FontPair;