const db = require('../models');

// Create Font Pair
exports.createFontPair = (req, res) => {
  console.log('create font pair');
  const heading = req.body.heading;
  const body = req.body.body;

  const fontPair = {
    heading: {
      fontFamily: heading.fontFamily,
      fontWeight: heading.fontWeight,
      fontSize: heading.fontSize,
      letterSpacing: heading.letterSpacing,
      lineHeight: heading.lineHeight,
      color: heading.color
    },
    body: {
      fontFamily: body.fontFamily,
      fontWeight: body.fontWeight,
      fontSize: body.fontSize,
      letterSpacing: body.letterSpacing,
      lineHeight: body.lineHeight,
      color: body.color
    }
  };

  db.Users.update(
    { _id: req.user._id},
    { $push: {fontPairs: fontPair}},
    (err) => {
      if (err) {
        return res.send(err);
      }
      res.status(200).send('Font pair added to "My Collection"');
    }
  );
};

exports.getFonts = (req, res) => {
  const user = req.user;
  db.Users.findById(user._id, (err, foundUser) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json(foundUser.fontPairs);
  });
};

exports.deleteFont = (req, res) => {
  const user = req.user;
  const fontPairId = req.body.fontId;

  db.Users.findById(user._id, (err, foundUser) => {
    foundUser.fontPairs.pull(fontPairId);
    foundUser.save();
    res.status(200).send('Font pair deleted');
  });
};