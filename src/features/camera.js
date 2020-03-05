import React, { PureComponent } from 'react';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const {
  container, preview, capture, exitContainerStyle, swapStyle, takePhotoStyle,
} = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column' },
  preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  capture: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  exitContainerStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    opacity: 0.8,
    padding: 10,
  },
  swapStyle: {
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    opacity: 0.8,
    padding: 10,
  },
  takePhotoStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    opacity: 0.8,
    padding: 10,
  },
});
class Camera extends PureComponent {
  constructor() {
    super();

    this.state = {
      cameraDirection: 'front',
      cameraDirectionConstant: RNCamera.Constants.Type.front,
    };
    this.takePicture = this.takePicture.bind(this);
    this.swapCamera = this.swapCamera.bind(this);
  }

  takePicture = async () => {
    const { onPictureTake } = this.props;
    if (this.camera) {
      const options = {
        quality: 0.5, base64: true, orientation: 'portrait', fixOrientation: true,
      };
      const data = await this.camera.takePictureAsync(options);
      const { uri } = data;
      fetch(uri)
        .then((res) => res.blob())
        .then((res) => onPictureTake({ image: res }));
    }
  };

  swapCamera() {
    const { cameraDirection } = this.state;
    const cameraOptions = {
      front: 'back',
      back: 'front',
    };

    const newCameraDirection = cameraOptions[cameraDirection];
    const cameraDirectionConstant = RNCamera.Constants.Type[newCameraDirection];

    this.setState({
      cameraDirection: newCameraDirection,
      cameraDirectionConstant,
    });
  }

  render() {
    const { setCamera, showCamera } = this.props;
    const { cameraDirectionConstant } = this.state;
    return (
      <View style={container}>

        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={preview}
        />
        <TouchableOpacity
          onPress={() => setCamera(!showCamera)}
          style={exitContainerStyle}
        >
          <CommunityIcon name="close" color="white" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.swapCamera}
          style={swapStyle}
          type={cameraDirectionConstant}
        >
          <CommunityIcon name="camera-switch" color="white" size={30} />
        </TouchableOpacity>
        <View style={takePhotoStyle}>
          <TouchableOpacity onPress={this.takePicture} style={capture}>
            <CommunityIcon name="camera" color="white" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Camera;
