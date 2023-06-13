import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function IconButton({iconName, onPress, color}) {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <Icon name={iconName} color={color} size={30} />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    width: 40,
    height: 40,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 13,
    color: 'white',
  },
});

export default IconButton;
