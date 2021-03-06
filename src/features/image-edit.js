import React from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';

const {
  containerStyle,
  profilePictureStyle,
  textContainerStyle,
} = StyleSheet.create({
  containerStyle: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
  profilePictureStyle: {
    borderColor: '#FFD22F',
    borderWidth: 3,
    width: 180,
    height: 180,
    transform: [{ rotate: '90deg' }],
  },
  textContainerStyle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: '#FFD22F',
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
});

const ImageEdit = ({
  setCamera, showCamera, source,
}) => (
  <View style={containerStyle}>
    <TouchableOpacity onPress={() => setCamera(!showCamera)}>
      <Image style={profilePictureStyle} source={source} />
      <View style={textContainerStyle}>
        <Text style={{ color: 'white' }}>Click me to edit</Text>
      </View>
    </TouchableOpacity>
  </View>
);


export default ImageEdit;
