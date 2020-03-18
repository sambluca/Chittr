import React from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import InputLabel from './inputLabel';
import { hostname } from '../config';

const { containerStyle, profilePictureStyle } = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
  },
  profilePictureStyle: {
    borderColor: '#FFD22F',
    borderWidth: 3,
    borderBottomWidth: 0,
    width: 100,
    height: 100,
    transform: [{ rotate: '90deg' }],
  },
});

const User = ({
  signedInToken, firstName, lastName, userId,
}) => {
  const source = {
    uri: `${hostname}/user/${userId}/photo`,
    method: 'GET',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': signedInToken,
    },
  };

  return (
    <View style={{
      borderBottomColor: '#FFD22F',
      paddingBottom: 10,
      borderBottomWidth: 2,
    }}
    >
      <View style={containerStyle}>
        <Image
          style={profilePictureStyle}
          key={source.uri}
          source={source}
        />
        <View style={{ paddingLeft: 20 }}>
          <InputLabel fontSize={25} color="black" labelText={firstName} />
          <InputLabel fontSize={25} color="black" labelText={lastName} />
        </View>
      </View>
    </View>
  );
};

export default User;
