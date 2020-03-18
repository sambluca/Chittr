/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { View } from 'react-native';
import { FormInput, CentreView } from '../components';
import { hostname } from '../config';

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: null,
    };

    this.onTextChange = this.onTextChange.bind(this);
  }


  componentDidMount() {}

  onTextChange(text) {
    this.setState({
      searchInput: text,
    });

    this.searchForUser({ searchInput: text });
  }


  searchForUser({ searchInput }) {
    const { signedInToken, setUsers } = this.props;

    fetch(`${hostname}/search_user?q=${searchInput}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const users = res;
        setUsers(users);
      }).catch(() => {
        setUsers([]);
      });
  }

  render() {
    const {
      searchInput,
    } = this.state;

    return (
      <View style={{ marginVertical: 20 }}>
        <CentreView>
          <FormInput value={searchInput} stateChange={this.onTextChange} />
        </CentreView>
      </View>
    );
  }
}

export default SearchBar;
