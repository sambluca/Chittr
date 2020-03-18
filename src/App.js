import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { UserContextProvider, UserContextConsumer } from './context/signedIn';
import {
  LandingScreen,
  ChitFeed,
  Login,
  SignUp,
  Loading,
  Search,
  Profile,
  PostChit,
  UserProfile,
} from './pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator();

const SearchScreenStack = () => (
  <SearchStack.Navigator headerMode="none">
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="UserProfile" component={UserProfile} />
  </SearchStack.Navigator>
);

const Chittr = () => (
  <Tab.Navigator
    initialRouteName="ChitFeed"
    tabBarOptions={{
      activeTintColor: 'black',
    }}
  >
    <Tab.Screen
      name="ChitFeed"
      component={ChitFeed}
      options={{
        tabBarLabel: 'Chits',
        tabBarIcon: ({ focused, size }) => (
          <CommunityIcon name="home" color={focused ? '#FFD22F' : '#8E8E8F'} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreenStack}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ focused, size }) => (
          <MaterialIcon name="search" color={focused ? '#FFD22F' : '#8E8E8F'} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused, size }) => (
          <CommunityIcon name="account" color={focused ? '#FFD22F' : '#8E8E8F'} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Post Chit"
      component={PostChit}
      options={{
        tabBarLabel: 'Post Chit',
        tabBarIcon: ({ focused, size }) => (
          <CommunityIcon name="plus-circle" color={focused ? '#FFD22F' : '#8E8E8F'} size={size} />
        ),
      }}
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

          return userSignedIn ? <Chittr /> : <SignUpSignIn />;
        }}
      </UserContextConsumer>
    </NavigationContainer>
  </UserContextProvider>
);

export default app;
