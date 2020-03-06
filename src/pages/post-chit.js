import React, { Component } from 'react';
import {
  View, ScrollView, TextInput, StyleSheet, Image,
} from 'react-native';
import { Header, IconRow, Camera } from '../features';
import { UserContextConsumer } from '../context/signedIn';
import { hostname } from '../config';

const postPhoto = async ({ image, signedInToken, chitId }) => {
  await fetch(`${hostname}/chits/${chitId}/photo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': signedInToken,

    },
    body: image,
  });
};

const { containerStyle, textInputStyle, pictureStyle } = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  pictureStyle: {
    borderColor: '#FFD22F',
    borderWidth: 3,
    width: 180,
    height: 180,
    transform: [{ rotate: '90deg' }],
    marginBottom: 15,
  },
  textInputStyle: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
    marginBottom: 15,
  },
});

class NewChit extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      showCamera: false,
      image: {
        imageData: null,
        addedImage: false,
        imageUri: null,
      },
    };

    this.setInputValue = this.setInputValue.bind(this);
    this.postChit = this.postChit.bind(this);
    this.setCamera = this.setCamera.bind(this);
    this.onPictureTake = this.onPictureTake.bind(this);
  }


  onPictureTake({ image, uri }) {
    this.setState({
      image: {
        imageData: image,
        addedImage: true,
        imageUri: uri,
      },
    });
    this.setCamera();
  }

  setInputValue(inputValue) {
    this.setState({
      inputValue,
    });
  }

  setCamera() {
    const { showCamera } = this.state;
    this.setState({
      showCamera: !showCamera,
    });
  }

  reset() {
    const { navigation } = this.props;
    this.setState({
      inputValue: '',
      showCamera: false,
      image: {
        imageData: null,
        addedImage: false,
        imageUri: null,
      },
    });
    navigation.navigate('Chits');
  }

  postChit({ signedInToken, userId }) {
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
    }).then((res) => res.json()).then((res) => {
      const chitId = res.chit_id;
      const { image: { imageData, addedImage } } = this.state;

      if (addedImage) {
        postPhoto({ image: imageData, signedInToken, chitId });
      }

      this.reset();
    });
  }

  render() {
    const { inputValue, showCamera, image: { imageUri, addedImage } } = this.state;

    return (
      <UserContextConsumer>
        {({ userId, signedInToken }) => (showCamera ? (
          <Camera
            setCamera={this.setCamera}
            showCamera={showCamera}
            onPictureTake={this.onPictureTake}
          />
        ) : (
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
                placeholder="Write a Chit..."
              />
              {addedImage && <Image style={pictureStyle} source={{ uri: imageUri }} />}
              <IconRow postChit={() => this.postChit({ signedInToken, userId })} setCamera={this.setCamera} />
            </View>
          </ScrollView>
        )
        )}
      </UserContextConsumer>
    );
  }
}


export default NewChit;
