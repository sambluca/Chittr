import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { Button } from '../components';
import { ProfileHeader, ProfileInformation, SettingsButtons } from '../features';
import { hostname } from '../config';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: {},
    };
  }


  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    const { userId, signedInToken } = this.props;
    fetch(`${hostname}/user/${userId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const firstName = res.given_name;
        const lastName = res.family_name;
        const recentChits = res.recent_chits;
        const { email } = res;

        const userData = {
          firstName, lastName, recentChits, email, userId,
        };
        this.setState({
          userData,
        });
      });
  }


  render() {
    const { userId, signedInToken, signUserOut, switchToSettings } = this.props;
    const { userData } = this.state;

    return (
      <View>
        <ProfileHeader userId={userId} signedInToken={signedInToken} signUserOut={signUserOut} userData={userData} />
        <ProfileInformation userData={userData} />
        <SettingsButtons signedInToken={signedInToken} signUserOut={signUserOut} switchToSettings={switchToSettings} />
      </View>

    );
  }
}

export default Profile;
