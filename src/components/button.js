import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';

const {
  buttonStyle, buttonTextStyle,
} = StyleSheet.create({
  buttonStyle: ({ width, backgroundColor }) => ({
    paddingTop: 20,
    width,
    paddingBottom: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    backgroundColor,
    borderRadius: 10,
  }),
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const Button = ({
  buttonText, onPress, width = 250, backgroundColor = '#D8D8D8',
}) => (
  <TouchableOpacity
    style={buttonStyle({ width, backgroundColor })}
    onPress={onPress}
  >
    <Text style={buttonTextStyle}>{buttonText}</Text>
  </TouchableOpacity>
);


export default Button;
