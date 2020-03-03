import React from 'react';
import {
  Text, StyleSheet,
} from 'react-native';

const { labelStyle } = StyleSheet.create({
  labelStyle: ({ color = 'grey', fontSize = 20 }) => ({
    fontSize,
    color,
  }),
});

const Label = ({ labelText, color, fontSize }) => (
  <Text style={labelStyle({ color, fontSize })}>{labelText}</Text>);


export default Label;
