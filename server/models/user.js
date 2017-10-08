const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Define schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Member', 'Admin'],
    default: 'Member'
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, {
  timestamps: true
});

// Pre-save of user to database, hash password if password is modified or new
userSchema.pre('save', function(next) {
  const user = this;
  const saltFactor = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(saltFactor, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;