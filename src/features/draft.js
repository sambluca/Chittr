import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const {
  containerStyle,
  chitStyle,
  buttonStyle,
} = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    borderColor: '#FFD22F',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 10,
  },
  chitStyle: {
    fontSize: 20,
    marginRight: 100,
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 100,
    padding: 5,
    alignItems: 'center',
  },
});

const Draft = ({
  draft, postChit, removeDraft,
}) => (
  <View style={containerStyle}>
    <View>
      <Text style={chitStyle}>{draft}</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <TouchableOpacity style={buttonStyle} onPress={removeDraft}>
            <CommunityIcon name="delete" size={50} />
          </TouchableOpacity>
          <Text>Delete Draft</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <TouchableOpacity style={buttonStyle} onPress={postChit}>
            <CommunityIcon name="plus" size={50} />
          </TouchableOpacity>
          <Text>Post Chit</Text>
        </View>
      </View>
    </View>
  </View>
);

export default Draft;
