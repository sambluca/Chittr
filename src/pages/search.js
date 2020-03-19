/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { Header, SearchBar, Users } from '../features';
import { UserContextConsumer } from '../context/signedIn';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
    };

    this.setUsers = this.setUsers.bind(this);
  }

  setUsers(users) {
    this.setState({
      users,
    });
  }

  render() {
    const { navigation } = this.props;
    const { users } = this.state;

    return (
      <UserContextConsumer>
        {({ signedInToken, userId }) => (
          <View style={{ paddingBottom: 200 }}>
            <Header />
            <SearchBar setUsers={this.setUsers} signedInToken={signedInToken} />
            <Users users={users} navigation={navigation} userId={userId} />
          </View>
        )}
      </UserContextConsumer>


    );
  }
}

export default Search;
