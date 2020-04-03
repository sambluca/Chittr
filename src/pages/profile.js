/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import {
  ScrollView, Dimensions, View, Text,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  Header,
  ProfileHeader,
  ProfileInformation,
  ProfileButtons,
  Users,
} from '../features';
import { Chit, Button } from '../components';
import { hostname } from '../config';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#FFD22F' }}
    style={{ backgroundColor: '#8E8E8F' }}
    renderLabel={({ route }) => (
      <View>
        <Text
          style={{
            fontSize: 11,
            textAlign: 'center',
          }}
        >
          {route.title}
        </Text>
      </View>
    )}
  />
);

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: {},
      index: 0,
      loading: true,
      following: false,
      userFollowing: [],
      userFollowers: [],
    };

    this.setIndex = this.setIndex.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }

  componentDidMount() {
    const { following } = this.props;
    this.getUserData();
    this.getFollowing();
    this.getFollowers();
    this.setState({
      following,
    });
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
          firstName,
          lastName,
          recentChits,
          email,
          userId,
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

  getFollowing() {
    const { signedInToken, userId } = this.props;
    fetch(`${hostname}/user/${userId}/following`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
    }).then((res) => res.json()).then((res) => {
      this.setState({
        userFollowing: res,
      });
    });
  }


  getFollowers() {
    const { signedInToken, userId } = this.props;
    fetch(`${hostname}/user/${userId}/followers`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
    }).then((res) => res.json()).then((res) => {
      this.setState({
        userFollowers: res,
      });
    });
  }

  followUser() {
    const { getFollowing, userId, signedInToken } = this.props;
    fetch(`${hostname}/user/${userId}/follow`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
    }).then(() => {
      getFollowing();
      this.setState({
        following: true,
      });
    });
  }

  unfollowUser() {
    const { getFollowing, userId, signedInToken } = this.props;
    fetch(`${hostname}/user/${userId}/follow`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
    }).then(() => {
      getFollowing();
      this.setState({
        following: false,
      });
    });
  }

  render() {
    const {
      userId,
      signedInToken,
      signUserOut,
      switchToSettings,
      forceCacheBust,
      showProfileInformation = true,
      navigation,
      reroute,
    } = this.props;
    const {
      userData, index, loading, following, userFollowing, userFollowers,
    } = this.state;

    if (reroute) {
      this.getUserData();
    }
    const initialLayout = { width: Dimensions.get('window').width };

    const FirstRoute = () => (loading ? (
      <ScrollView />
    ) : (
      <ScrollView>
        {userData.recentChits.length > 0 ? (
          userData.recentChits.map(
            ({ chit_content: text, chit_id: id, timestamp }) => (
              <Chit
                key={id}
                firstName={userData.firstName}
                text={text}
                userId={userId}
                signedInToken={signedInToken}
                timestamp={timestamp}
                chitId={id}
                forceCacheBust={forceCacheBust}
              />
            ),
          )
        ) : (
          <Text
            style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}
          >
            No Chits Posted Yet!
          </Text>
        )}
      </ScrollView>
    ));
    const SecondRoute = () => (<Users users={userFollowing} navigation={navigation} userId={userId} />);

    const ThirdRoute = () => (<Users users={userFollowers} navigation={navigation} userId={userId} />);

    const FourthRoute = () => (
      <View>
        <ProfileInformation userData={userData} />
        <ProfileButtons
          signedInToken={signedInToken}
          signUserOut={signUserOut}
          switchToSettings={switchToSettings}
        />
      </View>
    );

    let routes = [
      { key: 'first', title: 'Chits' },
      { key: 'second', title: 'Following' },
      { key: 'third', title: 'Followers' },
      { key: 'fourth', title: 'Edit' },
    ];

    const scene = {
      first: FirstRoute,
      second: SecondRoute,
      third: ThirdRoute,
      fourth: FourthRoute,
    };

    if (!showProfileInformation) {
      delete scene.fourth;
      routes = routes.filter((route) => route.key !== 'fourth');
    }

    const renderScene = SceneMap(scene);

    return (
      <ScrollView style={{ flex: 1 }}>
        <Header />
        <ProfileHeader
          userId={userId}
          signedInToken={signedInToken}
          signUserOut={signUserOut}
          userData={userData}
          forceCacheBust={forceCacheBust}
        />
        {!showProfileInformation && (
          <View
            style={{
              borderBottomColor: '#FFD22F',
              borderBottomWidth: 1,
              paddingVertical: 5,
            }}
          >
            <View
              style={{
                marginLeft: 240,
              }}
            >
              <Button
                width={100}
                buttonText={following ? 'Unfollow' : 'Follow'}
                onPress={following ? this.unfollowUser : this.followUser}
              />
            </View>
          </View>
        )}
        {
          <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={this.setIndex}
            initialLayout={initialLayout}
            style={{}}
          />
        }
      </ScrollView>
    );
  }
}

export default Profile;
