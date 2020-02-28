import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const { containerStyle } = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFD22F',
  },
});

const Background = ({ children }) => (
  <ScrollView style={containerStyle}>
    {children}
  </ScrollView>

);

export default Background;
