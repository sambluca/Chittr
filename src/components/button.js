import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';

const {
  buttonStyle, buttonTextStyle,
} = StyleSheet.create({
  buttonStyle: ({ width }) => ({
    paddingTop: 20,
    width,
    paddingBottom: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  }),
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const Button = ({ buttonText, onPress, width = 250 }) => (
  <TouchableOpacity
    style={buttonStyle({ width })}
    onPress={onPress}
  >
    <Text style={buttonTextStyle}>{buttonText}</Text>
  </TouchableOpacity>
);


export default Button;
