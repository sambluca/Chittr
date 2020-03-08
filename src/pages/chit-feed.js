import React from 'react';
import { View } from 'react-native';
import { UserContextConsumer } from '../context/signedIn';
import { Chits, Header } from '../features';

const ChitFeed = () => (
  <UserContextConsumer>
    {({ signedInToken }) => (
      <View style={{ flex: 1 }}>
        <Header />
        <Chits signedInToken={signedInToken} />
      </View>
    )}
  </UserContextConsumer>
);

export default ChitFeed;
