import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type TabBarIconProps = {
  icon: string;
  color: string;
};

const TabBarIcon = ({icon, color}: TabBarIconProps) => (
  // <Icon name={icon} color={color} size={24} />
  <Icon name={icon} size={24} color={color} />
);

TabBarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default TabBarIcon;
