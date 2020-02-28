import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import {
  TextLogo, Background, Button, CentreView,
} from '../components';

const {
  buttonContainerStyle,
  textLogoContainerStyle,
} = StyleSheet.create({
  buttonContainerStyle: {
    marginTop: 50,
  },
  textLogoContainerStyle: {
    marginTop: 100,
    marginBottom: 20,
  },
});

const LandingScreen = ({ navigation }) => (
  <Background>
    <CentreView>
      <View style={textLogoContainerStyle}>
        <TextLogo />
      </View>
      <View style={buttonContainerStyle}>
        <Button
          buttonText="Login"
          onPress={() => navigation.push('Login')}
        />
      </View>
      <View style={buttonContainerStyle}>
        <Button
          buttonText="Sign Up"
          onPress={() => navigation.push('SignUp')}
        />
      </View>
    </CentreView>
  </Background>
);

export default LandingScreen;
