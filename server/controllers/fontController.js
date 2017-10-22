const db = require('../models');

// Create Font Pair
exports.createFont = (req, res) => {
  const role = req.user.role;
  const font = req.body.font;

  if (role !== 'Admin') {
    return res.status(403).send('user not authorized');
  }

  const newFont = new db.Fonts({
    family: font.amily,
    category: font.category,
    variants: font.variants,
    version: font.version
  });

  newFont.save((err, font) => {
    if (err) {
      return res.send(err);
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
