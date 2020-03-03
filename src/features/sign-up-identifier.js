import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import Button from '../components/button';
import InputLabel from '../components/inputLabel';
import FormInput from '../components/formInput';

const {
  formContainer,
} = StyleSheet.create({
  formContainer: {
    marginTop: 40,
    marginBottom: 30,
  },
});

const isEmailInvalid = ({ email }) => {
  const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

  if (!email) {
    return 'Please enter your email';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email';
  }

  return false;
};


const SignUpIdentifier = ({
  setFirstName, setLastName, setEmail, firstName, lastName, email, setPage,
}) => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);


  return (
    <View>
      <View style={formContainer}>
        <InputLabel labelText="First Name" />
        <FormInput value={firstName} stateChange={setFirstName} />
        {firstNameError && <InputLabel labelText="Please enter your first name" color="red" />}
        <InputLabel labelText="Last Name" />
        <FormInput value={lastName} stateChange={setLastName} />
        {lastNameError && <InputLabel labelText="Please enter your last name" color="red" />}
        <InputLabel labelText="Email" />
        <FormInput value={email} stateChange={setEmail} autoCapitalize="none" />
        {emailError && <InputLabel labelText={emailError} color="red" />}
      </View>
      <Button
        buttonText="Next"
        onPress={() => {
          let error = false;
          if (!firstName) {
            error = true;
            setFirstNameError(true);
          }
          if (!lastName) {
            error = true;
            setLastNameError(true);
          }
          const emailValid = isEmailInvalid({ email });
          if (emailValid) {
            error = true;
            setEmailError(emailValid);
          }


          if (!error) {
            setFirstNameError(false);
            setLastNameError(false);
            setEmailError(false);
            setPage('password');
          }
        }}
      />
    </View>
  );
};


export default SignUpIdentifier;
