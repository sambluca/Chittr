import React, { Component } from 'react';
import { View } from 'react-native';
import { TextEdit, SettingButtons, ImageEdit } from '../features';
import { hostname } from '../config';

const editAccountRequest = ({
  body, userId, signedInToken, switchToSettings,
}) => fetch(`${hostname}/user/${userId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'X-Authorization': signedInToken,

  },
  body: JSON.stringify(body),
}).then(() => switchToSettings())
  .catch(() => ({
    error: true,
  }));

class EditProfile extends Component {
  constructor() {
    super();

    this.state = {
      lastName: {
        text: '',
        edited: false,
        placeholder: '',
      },
      firstName: {
        text: '',
        edited: false,
        placeholder: '',
      },
      email: {
        text: '',
        edited: false,
        placeholder: '',
      },
      password: {
        text: '',
        edited: false,
      },
    };

    this.editField = this.editField.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
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
        const { email } = res;

        this.setState({
          firstName: {
            edited: false,
            placeholder: firstName,
          },
          lastName: {
            edited: false,
            placeholder: lastName,
          },
          email: {
            edited: false,
            placeholder: email,
          },
        });
      });
  }

  editField({ field, text }) {
    this.setState({
      [field]: {
        text,
        edited: true,
      },
    });
  }

  saveChanges() {
    const { signedInToken, userId, switchToSettings } = this.props;
    const {
      firstName: { text: firstNameValue, edited: firstNameEdited },
      lastName: { text: lastNameValue, edited: lastNameEdited },
      email: { text: emailValue, edited: emailEdited },
      password: { text: passwordValue, edited: passwordEdited },
    } = this.state;

    const body = {};
    if (firstNameEdited && firstNameValue !== '') {
      body.given_name = firstNameValue;
    }
    if (lastNameEdited && lastNameValue !== '') {
      body.family_name = lastNameValue;
    }
    if (emailEdited && emailValue !== '') {
      body.email = emailValue;
    }
    if (passwordEdited && passwordValue !== '') {
      body.password = passwordValue;
    }


    editAccountRequest({
      body, userId, signedInToken, switchToSettings,
    });
  }

  render() {
    const { signedInToken, userId, switchToSettings } = this.props;
    const {
      firstName: { text: firstNameValue, placeholder: firstNamePlaceholder },
      lastName: { text: lastNameValue, placeholder: lastNamePlaceholder },
      email: { text: emailValue, placeholder: emailPlaceholder },
      password: { text: passwordValue },
    } = this.state;

    return (
      <View>
        <TextEdit
          text="First Name"
          value={firstNameValue}
          stateChange={this.editField}
          field="firstName"
          placeholder={firstNamePlaceholder}
        />
        <TextEdit
          text="Last Name"
          value={lastNameValue}
          stateChange={this.editField}
          field="lastName"
          placeholder={lastNamePlaceholder}
        />
        <TextEdit
          text="Email"
          value={emailValue}
          stateChange={this.editField}
          field="email"
          placeholder={emailPlaceholder}
        />
        <TextEdit
          text="Password"
          value={passwordValue}
          stateChange={this.editField}
          field="password"
          placeholder="Enter a new password"
          autoCapitalize="none"
          secureTextEntry
        />
        <ImageEdit signedInToken={signedInToken} userId={userId} text="Profile Picture" />
        <SettingButtons
          switchToSettings={switchToSettings}
          saveChanges={this.saveChanges}
        />
      </View>
    );
  }
}

export default EditProfile;
