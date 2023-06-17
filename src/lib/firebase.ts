import {FirebaseStorageTypes, firebase} from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {
  FIREBASE_CLOUD_STORAGE_BUCKET,
  FURNITURE_BUCKET,
  firebaseConfig,
  FURNITURE_DB,
} from '../config';

const furnitureBucket = firebase.app().storage(FIREBASE_CLOUD_STORAGE_BUCKET);

function listFilesAndDirectories(
  reference: FirebaseStorageTypes.Reference,
  refs: string[],
  pageToken?: FirebaseStorageTypes.ListOptions['pageToken'],
): Promise<string[]> {
  return reference.list({pageToken}).then(result => {
    // Loop over each item
    result.items.forEach(ref => {
      console.log(ref.fullPath);
      refs.push(ref.fullPath);
    });

    if (result.nextPageToken) {
      return listFilesAndDirectories(reference, refs, result.nextPageToken);
    }

    return Promise.resolve(refs);
  });
}

const list = async (): Promise<string[]> => {
  const urls: string[] = [];
  try {
    const reference = furnitureBucket.ref(FURNITURE_BUCKET);

    return await listFilesAndDirectories(reference, urls);
  } catch (error) {
    console.log('Erroror: ', error);
  }
  return urls;
};

async function getObjectUrl(ref: string) {
  return await furnitureBucket.ref(ref).getDownloadURL();
}

function getFurniture() {
  return database().ref(FURNITURE_DB).once('value');
}

async function uploadImageToFirebase(path: string) {
  try {
    const response = await fetch(path);
    const blob = await response.blob();
    const filename = `uploaded_${Date.now()}.png`;
    const storageRef = furnitureBucket.ref().child('feed').child(filename);
    await storageRef.put(blob);
    const downloadURL = await storageRef.getDownloadURL();
    console.log('Image uploaded successfully:', downloadURL);
  } catch (error) {
    console.error('Failed to upload image:', error);
  }
}

async function fetchImagesInFeedBucket() {
  try {
    const reference = furnitureBucket.ref('feed');
    const imageUrls = [];

    const files = await listFilesAndDirectories(reference, []);

    for (const file of files) {
      const downloadURL = await getObjectUrl(file);
      imageUrls.push(downloadURL);
    }
    // console.log('Image URLS ', imageUrls);
    return imageUrls;
  } catch (error) {
    console.error('Failed to fetch images in feed bucket:', error);
    return [];
  }
}

export default {
  list,
  getObjectUrl,
  getFurniture,
  uploadImageToFirebase,
  fetchImagesInFeedBucket,
};
