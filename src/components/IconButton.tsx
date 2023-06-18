import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: white;
  border-radius: 50px;
`;

type IconButtonProps = {
  iconName: string;
  onPress: () => void;
  color: string;
  size: number;
};

function IconButton({iconName, onPress, color, size}: IconButtonProps) {
  return (
    <Container onPress={onPress} width={size + 30} height={size + 30}>
      <Icon name={iconName} color={color} size={size || 30} />
    </Container>
  );
}

export default IconButton;
