import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
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

const requestLocationPermission = async () => {
  const alreadyGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  if (alreadyGranted) return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (err) {
    console.warn(err);
  }

  return false;
};


const {
  containerStyle,
  textInputStyle,
  pictureStyle,
  exitContainerStyle,
} = StyleSheet.create({
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
  exitContainerStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    opacity: 0.8,
    padding: 10,
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
      locationAdded: false,
      location: '',
    };

    this.setInputValue = this.setInputValue.bind(this);
    this.postChit = this.postChit.bind(this);
    this.setCamera = this.setCamera.bind(this);
    this.onPictureTake = this.onPictureTake.bind(this);
    this.findCoordinates = this.findCoordinates.bind(this);
  }

  componentDidMount() {
    requestLocationPermission();
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

  findCoordinates = () => {
    const { locationAdded } = this.state;
    if (!locationAdded) {
      Geolocation.getCurrentPosition(
        (position) => {
          const location = JSON.stringify(position);
          this.setState({
            location,
            locationAdded: !locationAdded,
          });
        },
        (error) => {
          console.log('err', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    } else {
      this.setState({
        locationAdded: !locationAdded,
        location: '',
      });
    }
  };


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
    navigation.navigate('ChitFeed');
  }

  postChit({ signedInToken, userId }) {
    const { inputValue, location: locationString, locationAdded } = this.state;
    const date = new Date();
    const timestamp = date.getTime();
    const chitBody = {
      chit_content: inputValue,
      timestamp,
      user: {
        user_id: userId,
      },
    };

    if (locationAdded) {
      const { coords: { longitude, latitude } } = JSON.parse(locationString);
      const location = { longitude, latitude };
      chitBody.location = location;
    }


    fetch(`${hostname}/chits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
      body: JSON.stringify(chitBody),
    })
      .then((res) => res.json())
      .then((res) => {
        const chitId = res.chit_id;
        const {
          image: { imageData, addedImage },
        } = this.state;

        if (addedImage) {
          postPhoto({ image: imageData, signedInToken, chitId });
        }

        this.reset();
      });
  }

  // addLocation() {
  //   const { locationAdded } = this.state;
  //   this.setState({
  //     locationAdded: !locationAdded,
  //   });
  // }

  render() {
    const {
      inputValue,
      showCamera,
      image: { imageUri, addedImage },
      locationAdded,
    } = this.state;

    const { navigation } = this.props;
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
              {addedImage && (
              <View>
                <Image style={pictureStyle} source={{ uri: imageUri }} />
                <TouchableOpacity
                  onPress={() => this.setState({
                    image: {
                      imageData: null,
                      addedImage: false,
                      imageUri: null,
                    },
                  })}
                  style={exitContainerStyle}
                >
                  <CommunityIcon name="close" color="white" size={30} />
                </TouchableOpacity>
              </View>
              )}
              <IconRow
                postChit={() => this.postChit({ signedInToken, userId })}
                setCamera={this.setCamera}
                addLocation={this.findCoordinates}
                locationAdded={locationAdded}
                goToDrafts={() => navigation.navigate('Drafts')}
              />
            </View>
          </ScrollView>
        ))}
      </UserContextConsumer>
    );
  }
}

export default NewChit;
