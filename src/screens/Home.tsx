import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default Home;
