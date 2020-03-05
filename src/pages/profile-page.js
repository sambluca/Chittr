import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { UserContextConsumer } from '../context/signedIn';
import { Header, Camera } from '../features';
import Profile from './profile';
import EditProfile from './edit-profile';
import { hostname } from '../config';


const postPhoto = async ({ image, signedInToken }) => {
  await fetch(`${hostname}/user/photo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': signedInToken,

    },
    body: image,
  });
};
const ProfilePage = () => {
  const [settings, setSettings] = useState(false);
  const [showCamera, setCamera] = useState(false);
  const switchToSettings = () => {
    setSettings(!settings);
  };

  return (
    <UserContextConsumer>
      {({ userId, signedInToken, signUserOut }) => {
        const component = settings ? (
          <EditProfile
            userId={userId}
            signedInToken={signedInToken}
            signUserOut={signUserOut}
            switchToSettings={switchToSettings}
            setCamera={setCamera}
            showCamera={showCamera}
          />
        ) : (
          <Profile
            userId={userId}
            signedInToken={signedInToken}
            signUserOut={signUserOut}
            switchToSettings={switchToSettings}
          />
        );

        const onPictureTake = ({ image }) => {
          postPhoto({ image, signedInToken });
          setCamera(!showCamera);
        };

        return showCamera ? (
          <Camera
            setCamera={setCamera}
            showCamera={showCamera}
            onPictureTake={onPictureTake}
          />
        ) : (
          <ScrollView>
            <Header />
            {component}
          </ScrollView>
        );
      }}
    </UserContextConsumer>
  );
};

export default ProfilePage;
