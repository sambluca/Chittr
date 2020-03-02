import React from 'react';
import { Text, View } from 'react-native';
import { UserContextConsumer } from '../context/signedIn';

const Search = () => (
  <UserContextConsumer>
    {({ userSignedIn }) => {
      console.log('userSignedin', userSignedIn);
      return (
        <View>
          <Text>Search</Text>
        </View>
      );
    }}
  </UserContextConsumer>
);

export default Search;
