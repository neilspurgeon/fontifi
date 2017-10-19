const db = require('../models');

// Create Font Pair
exports.createFont = (req, res) => {
  const role = req.user.role;

  if (role !== 'Admin') {
    return res.status(403).send('user not authorized');
  }

  // Get _id of each paired font here
  const pairedFontArr = [];

  const newFont = new db.Fonts({
    fontFamily: req.fontFamily,
    pairedFonts: pairedFontArr
  });

  newFont.save((err, font) => {
    if (err) {
      return res.send(err);
    }
    res.status(200).send('Font successfully added');
  });
};

// Submit Font
exports.submitFont = (req, res) => {
  // console.log('submitting font pair');

  // const heading = req.body.heading;
  // const body = req.body.body;
};

exports.getFonts = (req, res) => {
  db.Fonts.find({}, (err, fonts) => {
    console.log(fonts);
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json(fonts);
  });
};