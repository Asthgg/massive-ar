import React from 'react';
import {Dimensions, ImageBackground} from 'react-native';

import styled from 'styled-components/native';

const w = Dimensions.get('window').width / 2;

const Container = styled.TouchableOpacity`
  height: ${w}px;
  width: ${w - 15}px;
  margin: 5px;
  border-radius: 50px;
`;

const ContentWrapper = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0px;
  padding-vertical: 5px;
  padding-horizontal: 10px;
  border-bottom-end-radius: 20px;
  border-bottom-start-radius: 20px;
`;

const Date = styled.Text`
  color: white;
`;

type FeedItemProps = {
  uri: string;
};

const FeedItem = ({uri}: FeedItemProps) => {
  return (
    <Container
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.27,
      }}>
      <ImageBackground
        source={{uri}}
        resizeMode="cover"
        imageStyle={{borderRadius: 20}}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'flex-end',
        }}>
        <ContentWrapper>
          <Date>{'Date\n@Anonymous'}</Date>
        </ContentWrapper>
      </ImageBackground>
    </Container>
  );
};

export default FeedItem;
