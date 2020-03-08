import React, { PureComponent } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { hostname } from '../config';
import { Chit } from '../components';

class Chits extends PureComponent {
  constructor() {
    super();
    this.state = {
      chits: [],
      refreshing: false,
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.getChits();
  }

  onRefresh() {
    this.getChits();
  }

  getChits() {
    const { signedInToken } = this.props;
    fetch(`${hostname}/chits`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': signedInToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const chits = res;
        this.setState({
          chits,
        });
      });
  }


  render() {
    const { signedInToken } = this.props;
    const { chits, refreshing } = this.state;

    return (
      <ScrollView
        style={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
      }
      >
        {chits.map(
          ({
            user: { given_name: firstName, user_id: userId },
            chit_content: text,
            chit_id: id,
            timestamp,
          }) => (
            <Chit key={id} firstName={firstName} text={text} userId={userId} signedInToken={signedInToken} timestamp={timestamp} chitId={id} />
          ),
        )}
      </ScrollView>
    );
  }
}

export default Chits;
