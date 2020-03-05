import React from 'react';
import {
  View, StyleSheet, TextInput, Text,
} from 'react-native';

const { containerStyle, textInputStyle } = StyleSheet.create({
  containerStyle: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
  textInputStyle: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#FFFFFF',
    width: 350,
  },
});

const Input = ({
  value, stateChange, field, secureTextEntry, placeholder, autoCapitalize,
}) => (
  <TextInput
    style={textInputStyle}
    value={value}
    onChangeText={(text) => stateChange({ field, text })}
    secureTextEntry={secureTextEntry}
    placeholder={placeholder}
    autoCapitalize={autoCapitalize}

  />
);
const TextEdit = ({
  value,
  stateChange,
  field,
  text,
  secureTextEntry = false,
  placeholder,
  autoCapitalize = 'sentences',
}) => (
  <View style={containerStyle}>
    <Text>{text}</Text>
    <Input
      value={value}
      stateChange={stateChange}
      field={field}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
    />
  </View>
);

export default TextEdit;
