import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { UserContextConsumer } from '../context/signedIn';
import { TextLogo, CentreView } from '../components';
import Profile from './profile';

const { containerStyle } = StyleSheet.create({
  containerStyle: {},
});

const ProfilePage = () => {
  const [settings, setSettings] = useState(false);

  const switchToSettings = () => {
    setSettings(!settings);
  }
  return (
    <UserContextConsumer>
      {({
        userId, signedInToken, signUserOut,
      }) => (
        <View style={containerStyle}>
          <CentreView>
            <TextLogo />
          </CentreView>
          {!settings && <Profile userId={userId} signedInToken={signedInToken} signUserOut={signUserOut} switchToSettings={switchToSettings} />}
        </View>
      )}
    </UserContextConsumer>
  );
};

export default ProfilePage;

{ /* <View style={{ alignSelf: 'stretch' }}>
<InputLabel fontSize={20} color="black" labelText="Email" />
<InputLabel fontSize={20} color="black" labelText={email} />
</View> */ }
