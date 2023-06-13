import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import firebase from '../../lib/firebase';
import GalleryItem from '../../components/GalleryItem';
import {ArContextProps, useArContext, ArObject} from '../../context';

function FurnitureGallery() {
  const {currentObject, setCurrentObject}: ArContextProps = useArContext();
  const [objects, setObjects] = useState<ArObject[]>([]);

  useEffect(() => {
    void firebase.getFurniture().then(async snapshot => {
      console.log('Furniture data: ', snapshot.val());
      const uris: ArObject[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const values = snapshot.val();
      if (values) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        for await (const key of Object.keys(values)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          const uri = await firebase.getObjectUrl(values[key].model_url);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          const prev = await firebase.getObjectUrl(values[key].preview_url);
          uris.push({
            id: key,
            preview: prev,
            uri,
          });
        }

        setObjects(uris);
      }
    });
  }, []);

  return (
    <View>
      <FlatList
        data={objects}
        contentContainerStyle={styles.content}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => (
          <GalleryItem
            uri={item.preview}
            onPress={() => {
              if (currentObject?.id === item.id) {
                //deselect
                setCurrentObject(null);
              } else {
                setCurrentObject(item);
              }

              console.log('Select this item', item.id);
            }}
            style={item.id === currentObject?.id ? styles.activeObject : null}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2b27',
  },
  content: {
    backgroundColor: '#2a2b27',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeObject: {
    borderWidth: 2,
    borderColor: 'white',
    width: 75,
    height: 75,
  },
});

export default FurnitureGallery;
