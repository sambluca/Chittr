import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { InputLabel } from '../components';

const { containerStyle, formContainerStyle } = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  formContainerStyle: {
    paddingTop: 7,
    paddingBottom: 7,
  },
});

const ProfileInformation = ({ userData }) => {
  const { email } = userData;

  return (
    <View style={containerStyle}>
      <View style={formContainerStyle}>
        <InputLabel fontSize={25} color="black" labelText="Email" />
        <InputLabel fontSize={22} color="black" labelText={email} />
      </View>
      <View style={formContainerStyle}>
        <InputLabel fontSize={25} color="black" labelText="Password" />
        <InputLabel fontSize={22} color="black" labelText="*****" />
      </View>
    </View>
  );
};

export default ProfileInformation;
