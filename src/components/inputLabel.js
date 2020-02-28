import React from 'react';
import {
  Text, StyleSheet,
} from 'react-native';

const { labelStyle } = StyleSheet.create({
  labelStyle: ({ color = 'grey' }) => ({
    fontSize: 20,
    color,
  }),
});

const Label = ({ labelText, color }) => (
  <Text style={labelStyle({ color })}>{labelText}</Text>);


export default Label;
