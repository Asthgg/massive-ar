import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const RootLayout = ({children}) => (
  <View style={styles.wrapper}>{children}</View>
);

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
