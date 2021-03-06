import React from 'react';
import {
  TextInput, StyleSheet,
} from 'react-native';

const { textInputStyle } = StyleSheet.create({
  textInputStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    width: 300,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFD22F',
  },
});

const FormInput = ({
  value, stateChange, secureTextEntry = false, autoCapitalize = 'sentences',
}) => (
  <TextInput style={textInputStyle} value={value} onChangeText={(text) => stateChange(text)} secureTextEntry={secureTextEntry} autoCapitalize={autoCapitalize} />
);

export default FormInput;
