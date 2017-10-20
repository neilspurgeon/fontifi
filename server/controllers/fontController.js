const db = require('../models');

// Create Font Pair
exports.createFont = (req, res) => {
  const role = req.user.role;
  const fontFamily = req.body.fontFamily;
  const fontPairs = req.body.fontPairs;

  if (role !== 'Admin') {
    return res.status(403).send('user not authorized');
  }

  const newFont = new db.Fonts({
    fontFamily: fontFamily,
    fontPairs: fontPairs
  });

  newFont.save((err, font) => {
    if (err) {
      return res.send(err);
    }
    res.status(200).send('Font successfully added');
  });
};

exports.addFontPair = (req, res) => {
  const role = req.user.role;
  const parentId = req.params.id;
  const fontPair = req.body.fontPair;

  if (role !== 'Admin') {
    return res.status(403).send('user not authorized');
  }

  db.Fonts.update(
    { _id: parentId},
    { $push: {fontPairs: fontPair}},
    (err) => {
      if (err) {
        return res.status(403).send(err);
      }
      res.status(200).send('Font pair successfully added');
    }
  );
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
