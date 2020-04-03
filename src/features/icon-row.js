import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { containerStyle, buttonStyle } = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 100,
    padding: 5,
    alignItems: 'center',
  },
});

const IconRow = ({
  postChit, setCamera, addLocation, locationAdded,
}) => (
  <View style={containerStyle}>
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity style={buttonStyle} onPress={setCamera}>
        <CommunityIcon name="camera" size={50} />
      </TouchableOpacity>
      <Text>Camera</Text>
    </View>
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity style={buttonStyle} onPress={addLocation}>
        <Icon name="add-location" size={50} color={locationAdded ? 'blue' : 'black'} />
      </TouchableOpacity>
      <Text>
        Location
      </Text>
    </View>
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity style={buttonStyle} onPress={postChit}>
        <CommunityIcon name="plus" size={50} />
      </TouchableOpacity>
      <Text>Post Chit</Text>
    </View>
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity style={buttonStyle}>
        <CommunityIcon name="folder-edit" size={50} />
      </TouchableOpacity>
      <Text>Drafts</Text>
    </View>
  </View>
);

export default IconRow;
