import React from 'react';
import { Text, View } from 'react-native';
import { UserContextConsumer } from '../context/signedIn';

const NewChit = () => (
  <UserContextConsumer>
    {({ userSignedIn }) => {
      console.log('userSignedin', userSignedIn);
      return (
        <View>
          <Text>NewChit</Text>
        </View>
      );
    }}
  </UserContextConsumer>
);

export default NewChit;
