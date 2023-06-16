import React, {useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import ViewShot from 'react-native-view-shot';
import { captureRef } from 'react-native-view-shot';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroSpotLight,
  ViroAmbientLight,
  ViroARPlaneSelector,
} from '@viro-community/react-viro';
import {ArContextProps, useArContext} from '../../context';
import ArObject from './ArObject';
import FurnitureGallery from './FurnitureGallery';
import EditionMode from './EditionMode';

const ArEditor = () => {
  const {sceneObjects, currentObject, setSceneObjects}: ArContextProps =
    useArContext();

  function onInitialized(state: ViroTrackingStateConstants, reason: any) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      console.log('Tracking');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
      console.log('Not tracking');
    }
  }

  const onPlaneSelected = e => {
    if (currentObject) {
      const newobj = sceneObjects.concat([
        {
          ...currentObject,
          rotationAngle: 0,
          // position: e.position,
          // anchorId: e.anchorId,
          ...e,
        },
      ]);
      setSceneObjects(newobj);
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroSpotLight
        innerAngle={5}
        outerAngle={45}
        direction={[0, -1, -0.2]}
        position={[0, 3, 0]}
        color="#ffffff"
        castsShadow={true}
        influenceBitMask={2}
        shadowMapSize={2048}
        shadowNearZ={2}
        shadowFarZ={5}
        shadowOpacity={0.7}
      />
      <ViroAmbientLight color="#ffffff" intensity={200} />
      {currentObject ? (
        <ViroARPlaneSelector onPlaneSelected={onPlaneSelected} />
      ) : null}

      {sceneObjects.map(object => {
        return <ArObject {...object} key={object.id} id={object.id} />;
      })}
    </ViroARScene>
  );
};

export default () => {

  var captureRef = useRef();


  const captureScreenshot = async () => {
    try {
      const uri = await captureRef.capture();
      console.log('Screenshot captured:', uri);
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  };

  return (
    <ViewShot style={styles.f1} ref={ref => (captureRef = ref)} >
    <View style={styles.f1}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ArEditor,
        }}
        style={styles.viro}
      />
      <EditionMode />
      <FurnitureGallery />
      <TouchableOpacity onPress={captureScreenshot}>
        <Text>Capture Screenshot</Text>
      </TouchableOpacity>
    </View>
    </ViewShot>
  );
};

const styles = StyleSheet.create({
  f1: {flex: 1},
  viro: {
    height: '100%',
    flex: 1,
  },
});
