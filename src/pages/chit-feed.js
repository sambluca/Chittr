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

// const ChitFeed = () => (
//   <UserContextConsumer>
//     {({ signedInToken }) => {
//       console.log('signedInToken', signedInToken);
//       return (
//         <View>
//           <Text>ChitFeed</Text>
//         </View>
//       );
//     }}
//   </UserContextConsumer>
// );

export default ChitFeed;
