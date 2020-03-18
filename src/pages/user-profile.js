import React from 'react';
import { View } from 'react-native';
import { UserContextConsumer } from '../context/signedIn';
import { Header, ProfileHeader } from '../features';

import Profile from './profile';

const ProfilePage = ({ route }) => {
  const { params: userId } = route;
  const forceCacheBust = Math.random();

  return (
    <UserContextConsumer>
      {({ signedInToken }) => (
        <Profile
          userId={userId.userId}
          signedInToken={signedInToken}
          forceCacheBust={forceCacheBust}
          showProfileInformation={false}
        />
      )}
    </UserContextConsumer>
  );
};

export default ProfilePage;
