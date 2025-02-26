// App.js
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/redux/store';
import useLoadToken from './src/redux/hooks/useLoadToken.js';
import HomeScreen from './src/screens/home/Home';
import LoginScreen from './src/screens/login/Login';
import SignupScreen from './src/screens/signup/SignUp';
import FirstScreen from './src/screens/signup/FirstScreen';
import BottomTabs from './src/screens/BottomTabs';
import ProfileSetup from './src/screens/profile/profileSetUp';
import { ActivityIndicator, View } from "react-native";
import { getUserIdFromToken } from './src/utility/utiles.js';
import { setUserId } from './src/redux/slices/authSlice.js';

const Stack = createStackNavigator();

// Authentication Screens
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Main App Screens
const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
    <Stack.Screen name="ProfileSetUp" component={ProfileSetup} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Main Navigation Component
const Navigation = () => {
  const dispatch = useDispatch()
  const loading = useLoadToken(); // Check if token is loading
  const token = useSelector((state) => state.auth.token); // Get token from Redux
  const userId = getUserIdFromToken(token)
  // Use useEffect to safely dispatch the action
  useEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
    }
  }, [userId, dispatch]); 
  

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
