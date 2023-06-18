import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  background-color: #fafffd;
  flex: 1;
`;

type FeedLayout = {
  children: JSX.Element[];
};

const FeedLayout = ({children}: FeedLayout) => {
  return <Container>{children}</Container>;
};

export default FeedLayout;
