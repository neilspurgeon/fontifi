const db = require('../models');

// Create Font Pair
exports.createFont = (req, res) => {
  const role = req.user.role;
  let font = req.body;

  if (role !== 'Admin') {
    return res.status(403).send('user not authorized');
  }

  const newFont = new db.Fonts({
    family: font.family,
    category: font.category,
    variants: font.variants,
    version: font.version
  });

  newFont.save((err, font) => {
    if (err) {
      console.log(err.message);
      return res.send(err.message);
    }
    res.status(200).send('Font successfully added to database');
  });
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
