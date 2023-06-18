import React from 'react';

import styled from 'styled-components/native';

const Wrapper = styled.View`
  background-color: #3c3323;
  border-bottom-end-radius: 30px;
  border-bottom-start-radius: 30px;
  height: 150px;
  width: 100%;
  position: absolute;
  top: 0px;
`;

const Container = styled.SafeAreaView``;

const Title = styled.Text`
  font-size: 25px;
  color: white;
  margin: 10px;
  left: 15px;
  font-weight: 700;
`;

type FeedLayout = {
  children?: JSX.Element;
  title: string;
};

const FeedHeader = ({children, title}: FeedLayout) => {
  return (
    <Wrapper
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.27,
      }}>
      <Container>
        <Title>{title}</Title>
        {children}
      </Container>
    </Wrapper>
  );
};

export default FeedHeader;
