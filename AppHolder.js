import React, { useEffect, useState, useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./screens/RootStackScreen";


import { DrawerNavigation } from "./navigation/drawerNavigator";

import { AuthContext } from "./store/AuthContext";
import { getToken, deleteToken } from "./asyncStore";

function AppHolder() {
  
  const { isLoggedIn, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getTokenData = async () => {
      const loginToken = await getToken();
      console.log("loginToken", loginToken);
      if(loginToken) dispatch({ type: "RETRIEVE_TOKEN", payload: loginToken });
    };
    getTokenData();
  }, []);
  
  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigation /> : <RootStackScreen />}
      
    </NavigationContainer>
  );
}

export default AppHolder;
