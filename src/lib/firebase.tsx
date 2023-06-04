import module from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';

function listFilesAndDirectories(
  reference: FirebaseStorageTypes.Reference,
  pageToken?: FirebaseStorageTypes.ListOptions['pageToken'],
): Promise<void> {
  return reference.list({pageToken}).then(result => {
    // Loop over each item
    result.items.forEach(ref => {
      console.log(ref.fullPath);
    });

    if (result.nextPageToken) {
      return listFilesAndDirectories(reference, result.nextPageToken);
    }

    return Promise.resolve();
  });
}

const list = (bucket: string) => {
  const reference = storage().ref(bucket);

  void listFilesAndDirectories(reference).then(() => {
    console.log('Finished listing');
  });
};

export default {
  list,
};
