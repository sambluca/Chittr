import React, { PureComponent } from 'react';
import {
  Text, ScrollView, StyleSheet, TextInput, View, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContextConsumer } from '../context/signedIn';
import {
  Header, Draft,
} from '../features';
import { hostname } from '../config';

const {
  textInputStyle, containerStyle, buttonStyle,
} = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  textInputStyle: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
    marginBottom: 15,
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 100,
    padding: 5,
    alignItems: 'center',
  },
});
class Drafts extends PureComponent {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      drafts: [],
      gettingData: true,
    };

    this.setInputValue = this.setInputValue.bind(this);
    this.addDraft = this.addDraft.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    AsyncStorage.getItem('@Chittr:drafts')
      .then((value = {}) => {
        const data = JSON.parse(value);

        this.setState({
          drafts: data || [],
          gettingData: false,
        });
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  setInputValue(inputValue) {
    this.setState({
      inputValue,
    });
  }

  addDraft() {
    const { drafts, inputValue } = this.state;
    const newDrafts = [...drafts, inputValue];
    return AsyncStorage.setItem(
      '@Chittr:drafts',
      JSON.stringify(newDrafts),
    ).then(() => {
      this.setState({
        inputValue: '',
      });

      this.getData();
    }).catch((err) => console.log(err));
  }

  removeDraft({ draftIndex }) {
    const { drafts } = this.state;
    const newDrafts = drafts.filter((draft, index) => index !== draftIndex);
    return AsyncStorage.setItem(
      '@Chittr:drafts',
      JSON.stringify(newDrafts),
    ).then(() => {
      this.setState({
        inputValue: '',
      });

      this.getData();
    }).catch((err) => console.log(err));
  }

  reset() {
    const { navigation } = this.props;
    this.setState({
      inputValue: '',
    });
    navigation.navigate('ChitFeed');
  }

  postChit({
    userId, signedInToken, draft, draftIndex,
  }) {
    const date = new Date();
    const timestamp = date.getTime();

    const chitBody = {
      chit_content: draft,
      timestamp,
      user: {
        user_id: userId,
      },
    };

    fetch(`${hostname}/chits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
      body: JSON.stringify(chitBody),
    })
      .then((res) => res.json())
      .then(() => {
        this.removeDraft({ draftIndex });
        this.reset();
      });
  }

  render() {
    const { drafts, gettingData, inputValue } = this.state;
    return (
      <UserContextConsumer>
        {({ userId, signedInToken }) => ((
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
                placeholder="Add a draft chit..."
              />
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity style={buttonStyle} onPress={() => this.addDraft({ drafts, newChit: inputValue })}>
                  <CommunityIcon name="plus" size={50} />
                </TouchableOpacity>
                <Text>Add Draft Chit</Text>
              </View>
              {!gettingData && drafts.length > 0 && drafts.map((draft, index) => (
                <Draft
                  key={`${draft}${index}`}
                  draft={draft}
                  postChit={() => this.postChit({
                    userId, signedInToken, draft, draftIndex: index,
                  })}
                  removeDraft={() => this.removeDraft({ draftIndex: index })}
                />
              ))}
            </View>
          </ScrollView>
        ))}
      </UserContextConsumer>
    );
  }
}

export default Drafts;
