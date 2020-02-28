import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import Button from './button';
import InputLabel from './inputLabel';
import FormInput from './formInput';
import { hostname } from '../config';
import { UserContextConsumer } from '../context/signedIn';

const signUpRequest = ({
  email, password, firstName, lastName,
}) => fetch(`${hostname}/user`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    given_name: firstName,
    family_name: lastName,
    email,
    password,
  }),
}).then((res) => res.json())
  .catch(() => ({
    signUpError: true,
  }));


const loginRequest = ({
  email, password, signUserIn,
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
  .then((res) => signUserIn({ signedInToken: res.token }));

const {
  formContainer,
} = StyleSheet.create({
  formContainer: {
    marginTop: 40,
    marginBottom: 30,
  },
});

const SignUpPassword = ({
  firstName, password, confirmPassword, setPassword, setConfirmPassword, email, lastName, setPage,
}) => {
  const [passwordError, setPasswordError] = useState(false);
  const [matchPasswordError, setMatchPasswordError] = useState(false);


  return (
    <UserContextConsumer>
      {({ signUserIn }) => (
        <View>
          <View style={formContainer}>
            <InputLabel labelText={`Welcome to Chittr ${firstName}!`} color="black" />
            <InputLabel labelText="Password" />
            <FormInput value={password} stateChange={setPassword} secureTextEntry />
            {passwordError && <InputLabel labelText="Please enter a password" color="red" />}
            <InputLabel labelText="Confirm Password" />
            <FormInput value={confirmPassword} stateChange={setConfirmPassword} secureTextEntry />
            {matchPasswordError && <InputLabel labelText="Passwords must match" color="red" />}
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          >
            <Button
              width={120}
              buttonText="Go back"
              onPress={() => {
                setPage('identifier');
              }}
            />

            <Button
              width={120}
              buttonText="Sign up"
              onPress={async () => {
                let error = false;
                if (!password) {
                  error = true;
                  setPasswordError(true);
                } else {
                  setPasswordError(false);
                }

                if (password !== confirmPassword) {
                  error = true;
                  setMatchPasswordError(true);
                }

                if (!error) {
                  setPasswordError(false);
                  const { signUpError = false } = await signUpRequest({
                    email, password, firstName, lastName,
                  });

                  if (!signUpError) {
                    loginRequest({ email, password, signUserIn });
                  }
                }
              }}
            />
          </View>
        </View>
      )}
    </UserContextConsumer>
  );
};


export default SignUpPassword;
