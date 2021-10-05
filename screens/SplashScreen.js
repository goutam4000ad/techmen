import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import SignInScreen from "./SignInScreen";

import {AuthContext} from "../store/AuthContext"

const SplashScreen = ({ navigation }) => {
  const {splashScreen, dispatch} = useContext(AuthContext);
  const [showScreen, setShowScreen] = useState(true);
  
  //console.log(splashScreen);
  
  useEffect(() => {
    let isMounted = true; 
    console.log(splashScreen, showScreen)
    if (!splashScreen || !showScreen) return;//navigation.navigate("SignInScreen", { screen: "SignInScreen" });
    
    setTimeout(() => {
      if(isMounted){ 
      dispatch({ type: "SPLASH_SCREEN", payload: false });
      setShowScreen(false);
      navigation.navigate("SignInScreen", { screen: "SignInScreen" });
      }
    }, 1000);

    return () => { isMounted = false };
  }, []);

  return (
    <View style={styles.container}>
      { splashScreen ? (
        <View style={styles.container}>
          <StatusBar backgroundColor="#009387" barStyle="light-content" />
          <View style={styles.header}>
            <Image
              source={require("../assets/splash/splash.png")}
              style={styles.logo}
              resizeMode="stretch"
            />
          </View>
        </View>
      ) : <SignInScreen navigation={navigation} />
      }
    </View>
  );
};

export default SplashScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* backgroundColor: "#009387", */
  },
  header: {
    flex: 1,
    /* flex: 2,
      justifyContent: 'center',
      alignItems: 'center' */
    /* width: d_width,
      height: d_height */
  },
  logo: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  
});
