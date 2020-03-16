/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import {
  ScrollView,
  Dimensions,
  View,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  Header, ProfileHeader, ProfileInformation, ProfileButtons,
} from '../features';
import { Chit } from '../components';
import { hostname } from '../config';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#FFD22F' }}
    style={{ backgroundColor: '#8E8E8F' }}
  />
);

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: {},
      routes: [
        { key: 'first', title: 'Recent Chits' },
        { key: 'second', title: 'Profile Information' },
      ],
      index: 0,
      loading: true,
    };

    this.setIndex = this.setIndex.bind(this);
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
          loading: false,
        });
      });
  }


  setIndex(index) {
    this.setState({
      index,
    });
  }

  render() {
    const {
      userId, signedInToken, signUserOut, switchToSettings, forceCacheBust,
    } = this.props;
    const {
      userData, routes, index, loading,
    } = this.state;

    const initialLayout = { width: Dimensions.get('window').width };

    const FirstRoute = () => (loading ? <ScrollView /> : (
      <ScrollView>
        {userData.recentChits.map(
          ({
            chit_content: text,
            chit_id: id,
            timestamp,
          }) => (
            <Chit key={id} firstName={userData.firstName} text={text} userId={userId} signedInToken={signedInToken} timestamp={timestamp} chitId={id} />
          ),
        )}
      </ScrollView>
    ));
    const SecondRoute = () => (
      <View>
        <ProfileInformation userData={userData} />
        <ProfileButtons signedInToken={signedInToken} signUserOut={signUserOut} switchToSettings={switchToSettings} />
      </View>
    );

    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });

    return (
      <View style={{ flex: 1 }}>
        <Header />
        <ProfileHeader userId={userId} signedInToken={signedInToken} signUserOut={signUserOut} userData={userData} forceCacheBust={forceCacheBust} />
        <TabView
          navigationState={{ index, routes }}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={this.setIndex}
          initialLayout={initialLayout}
          style={{
          }}
        />
      </View>

    );
  }
}

export default Profile;
