import React, { Component } from 'react';
import {
  View, ScrollView, TextInput, StyleSheet,
} from 'react-native';
import { Header, IconRow } from '../features';
import { UserContextConsumer } from '../context/signedIn';
import { hostname } from '../config';

const { containerStyle, textInputStyle } = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  textInputStyle: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
  },
});

class NewChit extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
    };

    this.setInputValue = this.setInputValue.bind(this);
    this.postChit = this.postChit.bind(this);
  }

  setInputValue(inputValue) {
    this.setState({
      inputValue,

    });
  }

  postChit({ signedInToken, userId }) {
    const { navigation } = this.props;
    const { inputValue } = this.state;
    const date = new Date();
    const timestamp = date.getTime();
    fetch(`${hostname}/chits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
      body: JSON.stringify({
        chit_content: inputValue,
        timestamp,
        user: {
          user_id: userId,
        },
      }),
    }).then(() => {
      this.setState({
        inputValue: '',
      });
      navigation.navigate('Chits');
    });
  }

  render() {
    const { inputValue } = this.state;
    // const postChit = () => {
    //   console.log(inputValue);
    // };

    return (
      <UserContextConsumer>
        {({ userId, signedInToken }) => (
          <ScrollView>
            <Header />
            <View style={containerStyle}>
              <TextInput
                style={textInputStyle}
                multiline
                textAlignVertical="top"
                maxLength={141}
                blurOnSubmit
                value={inputValue}
                onChangeText={this.setInputValue}
              />
              <IconRow postChit={() => this.postChit({ signedInToken, userId })} />
            </View>
          </ScrollView>
        )}
      </UserContextConsumer>
    );
  }
}


export default NewChit;
