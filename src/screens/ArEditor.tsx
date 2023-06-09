import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroTrackingState,
  ViroTrackingReason,
  Viro3DObject,
  ViroSpotLight,
  ViroAmbientLight,
  ViroARPlaneSelector
} from '@viro-community/react-viro';

const ArEditor = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state: ViroTrackingState, reason: ViroTrackingReason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      /> */}
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        source={require('../assets/chair.glb')}
        type="GLB"
        scale={[1, 1, 1]}
        position={[0, 0, 1]}
        onLoadStart={() => console.log('OnLoadStart 3D object: ')}
        // onLoadEnd={args => console.log('onLoadError 3D object: ', args)}
        onError={err => console.log('Error 3D object: ', err)}
      />
      </ViroARPlaneSelector>
      
    </ViroARScene>
  );
};

export default (): JSX.Element => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: ArEditor,
      }}
      style={styles.f1}
    />
  );
};

const styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
