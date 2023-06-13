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

export default {
  list,
  getObjectUrl,
  getFurniture,
};
