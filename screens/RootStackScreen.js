import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./SplashScreen";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerMode: false,
      }}
    >
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  );  
};

export default RootStackScreen;
