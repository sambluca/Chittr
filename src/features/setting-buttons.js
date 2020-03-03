import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { Button } from '../components';

const { containerStyle } = StyleSheet.create({
  containerStyle: {
    marginTop: 50,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const SettingButtons = ({
  saveChanges, switchToSettings,
}) => (
  <View style={containerStyle}>
    <Button width={150} onPress={switchToSettings} buttonText="Cancel" backgroundColor="#FFD22F" />
    <Button width={150} onPress={saveChanges} buttonText="Save" backgroundColor="#FFD22F" />
  </View>
);

export default SettingButtons;
