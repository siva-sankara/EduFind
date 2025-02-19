

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, AuthProvider } from "./AuthContext";
import { ActivityIndicator, View } from "react-native";
import HomeScreen from "./src/screens/home/Home";
import LoginScreen from "./src/screens/login/Login";
import SignupScreen from "./src/screens/signup/SignUp";
import FirstScreen from "./src/screens/signup/FirstScreen";
import BottomTabs from "./src/screens/BottomTabs";


const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const Navigation = () => {
  const { userToken, loading } = useContext(AuthContext);
  // const userToken = null;
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <NavigationContainer>{!userToken ? <AppStack /> : <AuthStack />}</NavigationContainer>;
};

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
    // <Navigation />
  );
}
