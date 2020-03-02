import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider, UserContextConsumer } from './context/signedIn';
import {
  LandingScreen, Chits, Login, SignUp, Loading,
} from './pages';

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
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const LoadingScreen = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Loading" component={Loading} />
  </Stack.Navigator>
);


const app = () => (
  <UserContextProvider>
    <NavigationContainer>
      <UserContextConsumer>
        {({ readingFromStorage, userSignedIn }) => {
          if (readingFromStorage) {
            return <LoadingScreen />;
          }

          return (userSignedIn ? <Chittr /> : <SignUpSignIn />);
        }}
      </UserContextConsumer>
    </NavigationContainer>
  </UserContextProvider>
);

export default app;
