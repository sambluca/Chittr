import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { UserContextConsumer } from '../context/signedIn';
import { Header } from '../features';
import Profile from './profile';
import EditProfile from './edit-profile';

const { containerStyle } = StyleSheet.create({
  containerStyle: {},
});

const ProfilePage = () => {
  const [settings, setSettings] = useState(false);

  const switchToSettings = () => {
    setSettings(!settings);
  };

  return (
    <UserContextConsumer>
      {({ userId, signedInToken, signUserOut }) => (
        <ScrollView style={containerStyle}>
          <Header />
          {settings ? (
            <EditProfile
              userId={userId}
              signedInToken={signedInToken}
              signUserOut={signUserOut}
              switchToSettings={switchToSettings}
            />
          ) : (
            <Profile
              userId={userId}
              signedInToken={signedInToken}
              signUserOut={signUserOut}
              switchToSettings={switchToSettings}
            />
          )}
        </ScrollView>
      )}
    </UserContextConsumer>
  );
};

export default ProfilePage;
