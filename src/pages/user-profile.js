import React from 'react';
import { UserContextConsumer } from '../context/signedIn';

import Profile from './profile';

const ProfilePage = ({ route, navigation }) => {
  const { params: { userId, following, getFollowing } } = route;
  const forceCacheBust = Math.random();

  return (
    <UserContextConsumer>
      {({ signedInToken }) => (
        <Profile
          userId={userId}
          signedInToken={signedInToken}
          forceCacheBust={forceCacheBust}
          showProfileInformation={false}
          following={following}
          getFollowing={getFollowing}
          navigation={navigation}
        />
      )}
    </UserContextConsumer>
  );
};

export default ProfilePage;
