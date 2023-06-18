import React, {useRef, useState} from 'react';
import firebase from '../../lib/firebase';
import {
  Modal,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
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
import Screenshot from './Screenshot';

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
  let captureRef = useRef();

  const [screenshotUri, setScreenshotUri] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const captureScreenshot = async () => {
    try {
      const uri = await captureRef.capture();
      setScreenshotUri(uri);
      setModalVisible(true);
      console.log('Screenshot captured:', uri);
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setScreenshotUri('');
  };

  const handleUpload = async () => {
    try {
      await firebase.uploadImageToFirebase(screenshotUri);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.f1}>
        <ViewShot style={styles.f1} ref={ref => (captureRef = ref)}>
          <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
              scene: ArEditor,
            }}
            style={styles.viro}
          />
        </ViewShot>
        <EditionMode />
        <Screenshot
          visible={modalVisible}
          uri={screenshotUri}
          handleCancel={handleCancel}
          handleUpload={handleUpload}
          onCapture={captureScreenshot}
        />
      </View>
      <FurnitureGallery />
    </View>
  );
};

const styles = StyleSheet.create({
  viro: {
    height: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  f1: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
});
