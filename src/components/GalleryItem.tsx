import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    width: 65,
    height: 65,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 67,
    height: 67,
    borderRadius: 10,
  },
});

type GalleryProps = {
  onPress: () => void;
  uri: string;
  style: any;
};

const GalleryItem = ({onPress, uri, style}: GalleryProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
    <Image style={styles.image} resizeMode="cover" source={{uri}} />
  </TouchableOpacity>
);

GalleryItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  uri: PropTypes.string.isRequired,
  style: PropTypes.object,
};

GalleryItem.defaultProps = {
  style: null,
};

export default GalleryItem;
