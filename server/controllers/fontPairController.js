const db = require('../models');

// Create Font Pair
exports.createFontPair = (req, res) => {
  console.log('create font pair');

  const heading = req.body.heading;
  const body = req.body.body;

  const fontPair = new db.FontPair({
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
  });

  fontPair.save((err) => {
    if (err) {
      return res.send(err);
    }
    res.status(200).send('Thanks for contributing.');
  });
};