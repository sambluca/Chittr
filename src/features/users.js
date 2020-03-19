import React, { PureComponent } from 'react';
import {
  ScrollView, TouchableOpacity, Text, View,
} from 'react-native';
import { User } from '../components';
import { hostname } from '../config';

// const Users = ({
//   users, signedInToken, navigation,
// }) => (
//   <ScrollView>
//     {users.length !== 0 ? (
//       users.map(
//         ({ given_name: firstName, family_name: lastName, user_id: currentUserId }) => (
//           <TouchableOpacity
//             key={currentUserId}
//             onPress={() => {
//               navigation.navigate('UserProfile', { userId: currentUserId });
//             }}
//           >
//             <User
//               signedInToken={signedInToken}
//               firstName={firstName}
//               lastName={lastName}
//               userId={currentUserId}
//             />
//           </TouchableOpacity>
//         ),
//       )
//     ) : (
//       <Text>No Users Found Please Search Again</Text>
//     )}
//   </ScrollView>
// );
// export default Users;

// import Users, {PureComponent} from 'react';
// import {ScrollView, RefreshControl} from 'react-native';
// import {hostname} from '../config';
// import {Chit} from '../components';

class Users extends PureComponent {
  constructor() {
    super();
    this.state = {
      userFollowing: [],
      loading: true,
    };

    this.getFollowing = this.getFollowing.bind(this);
  }

  componentDidMount() {
    this.getFollowing();
  }

  getFollowing() {
    const { signedInToken, userId } = this.props;
    fetch(`${hostname}/user/${userId}/following`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
    }).then((res) => res.json()).then((res) => {
      this.setState({
        userFollowing: res,
        loading: false,
      });
    });
  }

  render() {
    const { users, signedInToken, navigation } = this.props;
    const { userFollowing, loading } = this.state;

    return loading ? <View /> : (
      <ScrollView>
        {users.length !== 0 ? (
          users.map(
            ({ given_name: firstName, family_name: lastName, user_id: currentUserId }) => {
              const following = userFollowing.filter((user) => user.user_id === currentUserId).length > 0;

              return (
                <TouchableOpacity
                  key={currentUserId}
                  onPress={() => {
                    navigation.navigate('UserProfile', { userId: currentUserId, following, getFollowing: this.getFollowing });
                  }}
                >
                  <User
                    signedInToken={signedInToken}
                    firstName={firstName}
                    lastName={lastName}
                    userId={currentUserId}
                  />
                </TouchableOpacity>
              );
            },
          )
        ) : (
          <Text>No Users Found Please Search Again</Text>
        )}
      </ScrollView>
    );
  }
}

export default Users;
