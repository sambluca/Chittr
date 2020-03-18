import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { User } from '../components';

const Users = ({ users, signedInToken, navigation }) => (
  <ScrollView>
    {users.length !== 0 ? (
      users.map(
        ({ given_name: firstName, family_name: lastName, user_id: userId }) => (
          <TouchableOpacity
            key={userId}
            onPress={() => {
              navigation.navigate('UserProfile', { userId });
            }}
          >
            <User
              signedInToken={signedInToken}
              firstName={firstName}
              lastName={lastName}
              userId={userId}
            />
          </TouchableOpacity>
        ),
      )
    ) : (
      <Text>No Users Found Please Search Again</Text>
    )}
  </ScrollView>
);

export default Users;
