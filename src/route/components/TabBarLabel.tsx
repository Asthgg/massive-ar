import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.Text`
  font-size: 12px;
`;

const TabBarLabel = ({text, color}) => (
  <Title numberOfLines={1} style={{color}}>
    {text}
  </Title>
);

TabBarLabel.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default TabBarLabel;
