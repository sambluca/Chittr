import React from 'react';
import { View, StyleSheet } from 'react-native';

const { containerStyle } = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
  },
});

const Centre = ({ children }) => (
  <View style={containerStyle}>
    {children}
  </View>

);

export default Centre;
