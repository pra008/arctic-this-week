import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';

function HeroImage({imageUrl, style}) {
  return <Image source={{uri: imageUrl}} style={[{height: 250}, style]} />;
}

HeroImage.propTypes = {
  imageUrl: PropTypes.string.isRequired, // Enforces a non-optional string
  style: PropTypes.object, // Allows additional styles to be passed in
};

HeroImage.defaultProps = {
  style: {}, // Default to an empty object if no style is provided
};

export default HeroImage;
