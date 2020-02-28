import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';

const {
  buttonStyle, buttonTextStyle,
} = StyleSheet.create({
  buttonStyle: {
    paddingTop: 20,
    width: 250,
    paddingBottom: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const Button = ({ buttonText, onPress }) => (
  <TouchableOpacity
    style={buttonStyle}
    onPress={onPress}
  >
    <Text style={buttonTextStyle}>{buttonText}</Text>
  </TouchableOpacity>
);


export default Button;
