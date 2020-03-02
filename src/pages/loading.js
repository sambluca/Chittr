import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import {
  TextLogo, Background, CentreView,
} from '../components';

const {
  textLogoContainerStyle,
} = StyleSheet.create({
  textLogoContainerStyle: {
    marginTop: 100,
  },
});

const Login = () => (
  <Background>
    <CentreView>
      <View style={textLogoContainerStyle}>
        <TextLogo />
      </View>
    </CentreView>
  </Background>
);

export default Login;
