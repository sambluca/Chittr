import React from 'react';
import { Text, View } from 'react-native';
import { UserContextConsumer } from '../context/signedIn';

const Chits = () => (
  <UserContextConsumer>
    {({ userSignedIn }) => {
      console.log('userSignedin', userSignedIn);
      return (
        <View>
          <Text>Chits</Text>
        </View>
      );
    }}
  </UserContextConsumer>
);

export default Chits;
