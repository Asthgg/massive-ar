/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const {assetExts} = require('metro-config/src/defaults/defaults');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...assetExts, // <- array spreading defaults
      'glb',
      'gltf',
      'fbx',
      'vrx',
    ],
  },
};
