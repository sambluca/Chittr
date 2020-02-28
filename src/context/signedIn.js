import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class UserContextProvider extends Component {
  constructor() {
    super();

    this.state = {
      userSignedIn: false,
      signedInToken: null,
    };

    this.signUserIn = this.signUserIn.bind(this);
  }

  signUserIn({ signedInToken }) {
    this.setState({
      userSignedIn: true,
      signedInToken,
    });
  }

  render() {
    const { userSignedIn, signedInToken } = this.state;
    const { children } = this.props;
    return (
      <Provider
        value={{ signUserIn: this.signUserIn, userSignedIn, signedInToken }}
      >
        {children}
      </Provider>
    );
  }
}

export { UserContextProvider, Consumer as UserContextConsumer };
