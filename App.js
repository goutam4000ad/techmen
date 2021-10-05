import React, { useEffect, useState, useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./screens/RootStackScreen";
import BottomTabNavigator from "./navigation/tabNavigator";
import {DrawerNavigation} from "./navigation/drawerNavigator"

import { AuthContextProvider, AuthContext } from "./store/AuthContext";
import { getToken } from './asyncStore'

import AppHolder from "./AppHolder";

const App = () => {
  
  return (
    <AuthContextProvider>
      <AppHolder />
    </AuthContextProvider>
  );
};

export default App;
