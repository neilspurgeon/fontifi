const FontPair = require('../models/fontPair');

// Create Font Pair
exports.createFontPair = (req, res) => {

  const heading = req.body.heading;
  const body = req.body.body;

  const fontPair = new FontPair({
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

  console.log(fontPair);
};