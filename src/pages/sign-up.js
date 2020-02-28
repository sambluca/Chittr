import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import {
  TextLogo, Background, SignUpIdentifier, CentreView, SignUpPassword,
} from '../components';

const {
  textLogoContainerStyle,
} = StyleSheet.create({
  textLogoContainerStyle: {
    marginTop: 100,
  },
});

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [page, setPage] = useState('identifier');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const Page = {
    identifier: <SignUpIdentifier email={email} firstName={firstName} lastName={lastName} setEmail={setEmail} setFirstName={setFirstName} setLastName={setLastName} setPage={setPage} />,
    password: <SignUpPassword password={password} confirmPassword={confirmPassword} setPassword={setPassword} setConfirmPassword={setConfirmPassword} email={email} firstName={firstName} lastName={lastName} setPage={setPage} />,
  }[page];

  return (
    <Background>
      <CentreView>
        <View style={textLogoContainerStyle}>
          <TextLogo />
        </View>
        {Page}
      </CentreView>
    </Background>
  );
};

export default SignUp;
