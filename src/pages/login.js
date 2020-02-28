import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import {
  TextLogo, Background, Button, InputLabel, FormInput, CentreView,
} from '../components';
import { UserContextConsumer } from '../context/signedIn';
import { hostname } from '../config';

const {
  formContainer,
  textLogoContainerStyle,
} = StyleSheet.create({
  formContainer: {
    marginTop: 40,
    marginBottom: 30,
  },
  textLogoContainerStyle: {
    marginTop: 100,
  },
});


const loginRequest = ({
  email, password, setError, signUserIn,
}) => fetch(`${hostname}/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email,
    password,
  }),
}).then((res) => res.json())
  .then((res) => signUserIn(res.token))
  .catch(() => setError(true));

const LandingScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  return (
    <UserContextConsumer>
      {({ signUserIn }) => (
        <Background>
          <CentreView>
            <View style={textLogoContainerStyle}>
              <TextLogo />
            </View>
            <View>
              <View style={formContainer}>
                <InputLabel labelText="Email" />
                <FormInput value={email} stateChange={setEmail} />
                <InputLabel labelText="Password" />
                <FormInput value={password} stateChange={setPassword} secureTextEntry />
                {error && <InputLabel labelText="Invalid email/password" color="red" />}
              </View>
              <Button
                buttonText="Login"
                onPress={() => loginRequest({
                  email, password, setError, signUserIn,
                })}
              />
            </View>
          </CentreView>
        </Background>
      )}
    </UserContextConsumer>
  );
};

export default LandingScreen;
