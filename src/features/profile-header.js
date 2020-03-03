import React from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import { InputLabel } from '../components';
import { hostname } from '../config';

const { containerStyle, profilePictureStyle } = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 30,
  },
  profilePictureStyle: {
    borderColor: '#FFD22F',
    borderWidth: 3,
    width: 180,
    height: 180,
  },
});

const ProfileHeader = ({
  signedInToken, userId, userData,
}) => {
  const { firstName, lastName } = userData;
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
        <View>
          <InputLabel fontSize={35} color="black" labelText={firstName} />
          <InputLabel fontSize={25} color="black" labelText={lastName} />
        </View>
        <Image
          style={profilePictureStyle}
          source={source}
        />
      </View>
    </View>

  );
};

export default ProfileHeader;
