import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

type Props = {
  children: JSX.Element;
};

const RootLayout = ({children}: Props) => (
  <View style={styles.wrapper}>{children}</View>
);

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
