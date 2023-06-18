import React from 'react';

import {
  Modal,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import IconButton from '../../components/IconButton';
import styled from 'styled-components/native';

type ScreenshotProps = {
  visible: boolean;
  uri: string;
  handleCancel: () => void;
  handleUpload: () => void;
  onCapture: () => void;
};

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 10px;
`;

const Screenshot = ({
  visible,
  uri,
  handleCancel,
  handleUpload,
  onCapture,
}: ScreenshotProps) => {
  return !visible ? (
    <ButtonContainer>
      <IconButton
        iconName="camera"
        color="black"
        onPress={onCapture}
        size={30}
      />
    </ButtonContainer>
  ) : (
    <View style={styles.container}>
      <Modal visible={visible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {uri && <Image source={{uri}} style={styles.previewImage} />}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleCancel}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleUpload}>
                <Text>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Screenshot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
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
