import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { CentreView, TextLogo } from '../components';

const { containerStyle } = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#FFD22F',
  },
});
const Header = () => (
  <View style={containerStyle}>
    <CentreView>
      <TextLogo />
    </CentreView>
  </View>
);

export default Header;
