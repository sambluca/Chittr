import React from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';
import { hostname } from '../config';
import { Button } from '../components';

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
  },
  imageContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

const Header = ({ signedInToken, userId, text }) => {
  const source = {
    uri: `${hostname}/user/${userId}/photo`,
    method: 'GET',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': signedInToken,
    },
  };

  return (
    <View style={containerStyle}>
      <Text>{text}</Text>
      <TouchableOpacity onPress={() => console.log('edit')}>
        <Image style={profilePictureStyle} source={source} />
        <View style={textContainerStyle}>
          <Text style={{ color: 'white' }}>Click me to edit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
