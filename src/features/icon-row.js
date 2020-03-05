import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { containerStyle, buttonStyle } = StyleSheet.create({
  containerStyle: {
    marginTop: 50,
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

const IconRow = ({ postChit }) => (
  <View style={containerStyle}>
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity style={buttonStyle}>
        <CommunityIcon name="camera" size={50} />
      </TouchableOpacity>
      <Text>Camera</Text>
    </View>
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity style={buttonStyle}>
        <CommunityIcon name="calendar" size={50} />
      </TouchableOpacity>
      <Text>Schedule</Text>
    </View>
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity style={buttonStyle}>
        <CommunityIcon name="folder-edit" size={50} />
      </TouchableOpacity>
      <Text>Drafts</Text>
    </View>
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity style={buttonStyle} onPress={postChit}>
        <CommunityIcon name="plus" size={50} />
      </TouchableOpacity>
      <Text>Post Tweet</Text>
    </View>
  </View>
);

export default IconRow;
