import React from 'react';

import {useArContext} from '../../context';
import {Text, View} from 'react-native';
import IconButton from '../../components/IconButton';

const EditionMode = () => {
  const {objectOnEdit, sceneObjects, setSceneObjects, setObjectOnEdit} =
    useArContext();

  const rotationSpeed = 90;

  const onPressButton = () => {
    const object = sceneObjects.find(o => o.id === objectOnEdit);

    if (objectOnEdit !== null) {
      const g = sceneObjects.filter(o => o.id !== objectOnEdit);
      console.log('Hallow: ', g);
      setSceneObjects(
        g.concat([
          {
            ...object,
            rotation: [0, (object?.rotation[1] | 0) + rotationSpeed, 0],
          },
        ]),
      );
    }
  };

  const onDelete = () => {
    setSceneObjects(sceneObjects.filter(o => o.id !== objectOnEdit));
    setObjectOnEdit(null);
  };

  return objectOnEdit !== null ? (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        height: 70,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View>
          <IconButton
            iconName="angle-acute"
            color="black"
            onPress={onPressButton}
          />
          <Text>Rotate</Text>
        </View>
        <View>
          <IconButton iconName="delete" color="black" onPress={onDelete} />
          <Text>Delete</Text>
        </View>
      </View>
    </View>
  ) : null;
};

export default EditionMode;
