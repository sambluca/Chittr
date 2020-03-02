import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const { Provider, Consumer } = React.createContext();

const storeData = ({ signedInToken, userId }) => {
  const userData = {
    userSignedIn: true,
    userId,
    signedInToken,
  };
  return AsyncStorage.setItem(
    '@Chittr:signedInToken',
    JSON.stringify(userData),
  );
};

class UserContextProvider extends Component {
  constructor() {
    super();

    this.state = {
      userSignedIn: false,
      signedInToken: null,
      userId: '',
      readingFromStorage: true,
    };

    this.signUserIn = this.signUserIn.bind(this);
    this.checkUserSignedIn = this.checkUserSignedIn.bind(this);
  }

  componentDidMount() {
    this.checkUserSignedIn();
  }

  checkUserSignedIn() {
    AsyncStorage.getItem('@Chittr:signedInToken')
      .then((value = {}) => {
        const data = JSON.parse(value);
        this.setState({
          ...data,
          readingFromStorage: false,
        });
      })
      .catch(() => {
        this.setState({ userSignedIn: false });
      });
  }

  signUserIn({ signedInToken, userId }) {
    storeData({ signedInToken, userId })
      .then(() => {
        this.setState({
          userSignedIn: true,
          signedInToken,
          userId,
        });
      });
  }

  render() {
    const {
      userSignedIn, signedInToken, userId, readingFromStorage,
    } = this.state;
    const { children } = this.props;

    return (
      <Provider
        value={{
          signUserIn: this.signUserIn,
          userSignedIn,
          signedInToken,
          userId,
          checkUserSignedIn: this.checkUserSignedIn,
          readingFromStorage,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { UserContextProvider, Consumer as UserContextConsumer };
