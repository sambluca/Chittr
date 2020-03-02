import React from 'react';
import { Text, View } from 'react-native';
import { UserContextConsumer } from '../context/signedIn';

const Profile = () => (
  <UserContextConsumer>
    {({ userSignedIn }) => {
      console.log('userSignedin', userSignedIn);
      return (
        <View>
          <Text>Profile</Text>
        </View>
      );
    }}
  </UserContextConsumer>
);

export default Profile;
