import React from 'react';
import { Text, StyleSheet } from 'react-native';

const { logoStyle } = StyleSheet.create({
  logoStyle: {
    fontWeight: 'bold',
    fontSize: 50,
  },
});

const TextLogo = () => (
  <Text style={logoStyle}>Chittr</Text>
);

export default TextLogo;
