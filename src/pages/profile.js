import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';
import {
  Header, ProfileHeader, ProfileInformation, ProfileButtons,
} from '../features';
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
    const {
      userId, signedInToken, signUserOut, switchToSettings,
    } = this.props;
    const { userData } = this.state;

    return (
      <ScrollView>
        <Header />
        <ProfileHeader userId={userId} signedInToken={signedInToken} signUserOut={signUserOut} userData={userData} />
        <ProfileInformation userData={userData} />
        <ProfileButtons signedInToken={signedInToken} signUserOut={signUserOut} switchToSettings={switchToSettings} />
      </ScrollView>

    );
  }
}

export default Profile;
