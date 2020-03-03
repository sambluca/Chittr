import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { Button } from '../components';
import { hostname } from '../config';

const logoutRequest = ({
  signedInToken, signUserOut,
}) => fetch(`${hostname}/logout`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Authorization': signedInToken,
  },
}).then(() => signUserOut());

const { containerStyle } = StyleSheet.create({
  containerStyle: {
    marginTop: 50,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const ProfileButtons = ({
  signedInToken, signUserOut, switchToSettings, switchText = 'Edit Profile',
}) => (
  <View style={containerStyle}>
    <Button width={150} onPress={switchToSettings} buttonText={switchText} backgroundColor="#FFD22F" />
    <Button width={150} onPress={() => logoutRequest({ signedInToken, signUserOut })} buttonText="Logout" backgroundColor="#FFD22F" />
  </View>
);

export default ProfileButtons;
