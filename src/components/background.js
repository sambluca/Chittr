import React from 'react';
import { View, StyleSheet } from 'react-native';

const { containerStyle } = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFD22F',
  },
});

const Background = ({ children }) => (
  <View style={containerStyle}>
    {children}
  </View>

);

export default Background;
