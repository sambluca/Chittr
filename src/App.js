import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider, UserContextConsumer } from './context/signedIn';
import { LandingScreen, Chits, Login } from './pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Chittr = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Chits"
      component={Chits}
    />
  </Tab.Navigator>
);

const SignUpSignIn = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Landing Screen" component={LandingScreen} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const app = () => (
  <UserContextProvider>
    <NavigationContainer>
      <UserContextConsumer>
        {({ userSignedIn }) => (userSignedIn ? <Chittr /> : <SignUpSignIn />)}
      </UserContextConsumer>
    </NavigationContainer>
  </UserContextProvider>
);

export default app;
