import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';

// Import the function to fetch images in the feed bucket
import firebase from '../lib/firebase';

const FeedComponent = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchFeedImages = async () => {
      const urls = await firebase.fetchImagesInFeedBucket();
      setImageUrls(urls);
      // console.log('Image URLS in feed ', urls);
    };

    fetchFeedImages();
  }, []);

  const renderItem = ({item}) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height / 2;
    const imageStyle = {
      width: screenWidth,
      height: screenHeight,
      resizeMode: 'contain',
    };

    console.log(item);

    return (
      <View style={styles.imageContainer}>
        <Image source={{uri: item}} style={imageStyle} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={imageUrls}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedComponent;
