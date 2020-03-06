import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import {
  TextEdit, SettingButtons, ImageEdit, Header, Camera,
} from '../features';
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

const postPhoto = async ({ image, signedInToken }) => {
  await fetch(`${hostname}/user/photo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': signedInToken,

    },
    body: image,
  });
};


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
      showCamera: false,
      imageData: {
        image: null,
        uri: null,
        editedImage: false,
      },
    };

    this.editField = this.editField.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.setCamera = this.setCamera.bind(this);
    this.onPictureTake = this.onPictureTake.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  onPictureTake({ image, uri }) {
    const {
      showCamera,
    } = this.state;

    this.setState({
      imageData: {
        image,
        uri,
        editedImage: true,
      },
    });

    this.setCamera(!showCamera);
  }

  setCamera(showCamera) {
    this.setState({
      showCamera,
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
      imageData: {
        editedImage,
        image,
      },
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


    if (editedImage) {
      postPhoto({ image, signedInToken });
    }

    editAccountRequest({
      body, userId, signedInToken, switchToSettings,
    });
  }

  render() {
    const {
      signedInToken, userId, switchToSettings,
    } = this.props;
    const {
      firstName: { text: firstNameValue, placeholder: firstNamePlaceholder },
      lastName: { text: lastNameValue, placeholder: lastNamePlaceholder },
      email: { text: emailValue, placeholder: emailPlaceholder },
      password: { text: passwordValue },
      showCamera,
      imageData: {
        editedImage,
        uri,
      },
    } = this.state;

    const source = editedImage ? {
      uri,
    } : {
      uri: `${hostname}/user/${userId}/photo?${Math.random()}`,
      method: 'GET',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': signedInToken,
      },
    };

    return showCamera ? (
      <Camera
        setCamera={this.setCamera}
        showCamera={showCamera}
        onPictureTake={this.onPictureTake}
      />
    )
      : (
        <ScrollView>
          <Header />
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
          <ImageEdit source={source} signedInToken={signedInToken} userId={userId} text="Profile Picture" setCamera={this.setCamera} showCamera={showCamera} />
          <SettingButtons
            switchToSettings={switchToSettings}
            saveChanges={this.saveChanges}
          />
        </ScrollView>
      );
  }
}

export default EditProfile;
