import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import firebase from '../lib/firebase';
import FeedItem from '../components/FeedItem';
import FeedLayout from '../components/FeedLayout';
import FeedHeader from '../components/FeedHeader';

const FeedComponent = ({navigation}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchFeedImages = async () => {
      const urls = await firebase.fetchImagesInFeedBucket();
      setImageUrls(urls);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Focused');
      void fetchFeedImages();
    });

    return unsubscribe;
  }, []);

  return (
    <FeedLayout>
      <FlatList
        data={imageUrls}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <FeedItem uri={item} />}
        numColumns={2}
        contentContainerStyle={{
          paddingTop: 150,
        }}
        style={{flex: 1}}
      />
      <FeedHeader title="Welcome" />
    </FeedLayout>
  );
};

export default FeedComponent;
