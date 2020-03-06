import React, { useState } from 'react';
import { UserContextConsumer } from '../context/signedIn';
import Profile from './profile';
import EditProfile from './edit-profile';

const ProfilePage = () => {
  const [settings, setSettings] = useState(false);
  const switchToSettings = () => {
    setSettings(!settings);
  };

  return (
    <UserContextConsumer>
      {({ userId, signedInToken, signUserOut }) => (settings ? (
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
      ))}
    </UserContextConsumer>
  );
};

export default ProfilePage;
