import React from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import format from 'date-fns/format';
import { hostname } from '../config';

const {
  profilePictureStyle,
  chitPictureStyle,
  profileStyle,
  containerStyle,
  nameStyle,
  dateStyle,
  chitStyle,
} = StyleSheet.create({
  profileStyle: {
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
  profilePictureStyle: {
    width: 80,
    height: 80,
    transform: [{ rotate: '90deg' }],
  },
  chitPictureStyle: {
    width: 200,
    height: 200,
    transform: [{ rotate: '90deg' }],
  },
  containerStyle: {
    flexDirection: 'row',
    borderColor: '#FFD22F',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 10,
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  dateStyle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  chitStyle: {
    fontSize: 20,
    marginRight: 100,
  },
});

const Chit = ({
  firstName, text, userId, signedInToken, timestamp, chitId,
}) => {
  const profilePictureSource = {
    uri: `${hostname}/user/${userId}/photo?${Math.random()}`,
    method: 'GET',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': signedInToken,
    },
  };

  const chitPictureSource = {
    uri: `${hostname}/chits/${chitId}/photo`,
    method: 'GET',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': signedInToken,
    },
  };

  const time = format(timestamp, 'HH:mma');
  const date = format(timestamp, 'dd/MM/yy');

  return (
    <View style={containerStyle}>
      <View style={profileStyle}>
        <Image style={profilePictureStyle} key={profilePictureSource.uri} source={profilePictureSource} />
        <Text style={dateStyle}>{time}</Text>
        <Text style={dateStyle}>{date}</Text>
      </View>
      <View>
        <Text style={nameStyle}>{firstName}</Text>
        <Text style={chitStyle}>{text}</Text>
        <Image style={chitPictureStyle} key={chitPictureSource.uri} source={chitPictureSource} />
      </View>
    </View>
  );
};

export default Chit;
