import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { hostname } from '../config';

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

const removeData = () => AsyncStorage.removeItem('@Chittr:signedInToken');

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
    this.signUserOut = this.signUserOut.bind(this);
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

  signUserOut() {
    removeData().then(() => this.setState({
      userSignedIn: false,
      signedInToken: null,
      userId: '',
    }));
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
          readingFromStorage,
          signUserOut: this.signUserOut,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { UserContextProvider, Consumer as UserContextConsumer };
