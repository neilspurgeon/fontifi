import React from 'react';
import FontListItem from 'components/adminPanel/FontListItem';

const FontList = ({fonts}) => {

  if (!fonts[0]) {
    return <h1>Empty State</h1>;
  }

  return (
    <div>
      { fonts.map((f, index) => {
        return (
          <FontListItem
            fontFamily={f.fontFamily}
            fontPairs={f.fontPairs}
            key={f.fontFamily} />
        );
      })};
    </div>);
};

export default FontList;
