import React, { useState, useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ArContext } from '../context/ArContext';
import {
  ViroARScene,
  ViroButton,
  ViroText,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroTrackingState,
  Viro3DObject,
  ViroSpotLight,
  ViroAmbientLight,
  ViroARPlaneSelector
} from '@viro-community/react-viro';

const ArEditor = (props) => {
  const rotationAngle = useContext(ArContext).rotationAngle;
  const [objectPosition, setObjectPosition] = useState([0, 0, 0]);

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  const handleObjectDrag = (dragToPos) => {
    const x = dragToPos[0]
    const z = dragToPos[2];
    setObjectPosition([x, objectPosition[1], z ]);
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
      <ViroARPlaneSelector>
        <Viro3DObject
          source={require('../assets/chair.glb')}
          type="GLB"
          scale={[1, 1, 1]}
          // dragType="FixedToPlane"
          position={objectPosition}
          rotation={[0, rotationAngle, 0]}
          onLoadStart={() => console.log('OnLoadStart 3D object: ')}
          onDrag={(dragToPos, source) => handleObjectDrag(dragToPos)}
          onError={err => console.log('Error 3D object: ', err)}
        />
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

export default () => {
  const { rotationAngle, setRotationAngle } = useContext(ArContext);

  const rotationSpeed = 90;

  const onPressButton = () => {
    setRotationAngle(prevAngle => prevAngle + rotationSpeed);
  };

  return (
    <View style={styles.f1}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ArEditor,
        }}
        style={styles.f1}
      />
      <Button title="Rotate" onPress={onPressButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
