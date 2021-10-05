import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../store/AuthContext";
import { loginCall } from "../apiCalls";

import { storeToken, deleteToken } from "../asyncStore";
import axios from "axios";

const signInUrl =
  "https://3n7u6zk0bf.execute-api.us-east-2.amazonaws.com/Dev/login";


const SignInScreen = ({ route = {}, navigation }) => {
  
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setenteredPassword] = useState("");
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const [welcomeMsg, setWelcomeMsg] = useState("");
  const [isWelcome, setIsWelcome] = useState(false);

  const { isFetching, dispatch } = useContext(AuthContext);

  
  useEffect(() => {
    
    ((route || {}).params || {}).email ? setEnteredEmail(route.params.email): null
    
    return () => {
      
    }
  }, [route])

  //console.log(route.params)
  //if('username' in route){
  /* if(route.hasOwnProperty('params')){  
    console.log('param=',route.params.username) 
    //user = route.params;
    //route.params.username?setWelcomeMsg(route.params.username):setWelcomeMsg('')
    if(route.params.username){
      //setIsWelcome(true);
      //setWelcomeMsg(route.params.username);
    }
  }  */

  const emailChangeHandler = (val) => {
    setEnteredEmail(val);
  };
  const passwordChangeHandler = (val) => {
    setenteredPassword(val);
  };

  const signInHandler = async () => {
    //console.log(enteredEmail, enteredPassword);
    /* const requestBody = {
      email: enteredEmail,
      password: enteredPassword,
    };
    loginCall(
      requestBody,
      dispatch
    ); */

    const requestConfig = {
      headers: {
        "x-api-key": "iu8H1EH1ORiJMKXW6YnJ9IS9wR4LVY78ZJlYin34",
      },
    };

    const requestBody = {
      email: enteredEmail,
      password: enteredPassword,
    };

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(signInUrl, requestBody, requestConfig);
      console.log("res=", res.data);

      if (res.data.errorCode == "") {
        storeToken({user:res.data.user, token:res.data.token});
        dispatch({ type: "LOGIN_SUCCESS", payload: {user:res.data.user, token:res.data.token} });
      }else{
        setIsValidLogin(false);
        setErrMsg(res.data.message);
        dispatch({ type: "LOGIN_FAILURE", payload: res.data.message });
      } 
    } catch (err) {
      console.log("err=", err);
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setIsValidLogin(false);
      setErrMsg(err.message);
    }
  };

  if( isFetching ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="always"
      >
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />

            <View style={styles.header}>
              <Image
                source={require("../assets/login/logo.png")}
                style={styles.logo}
                resizeMode="stretch"
              />
            </View>
            {((route || {}).params || {}).username ? (
              <View style={styles.welcomeHeader}>
                <Text style={styles.welcomeUser}>
                  Welcome {route.params.username}, Please Login to Continue
                </Text>
              </View>
            ) : null}
            <View style={styles.midSection}>
              <View style={styles.midSectionHeader}>
                <Text style={styles.midSectionTitle}>Log in or Sign up</Text>
              </View>

              <Text style={styles.labelText}>Email</Text>
              <View style={styles.action}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Your Email"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={emailChangeHandler}
                  value={enteredEmail}
                />
              </View>

              <Text style={styles.labelText}>Password</Text>
              <View style={styles.action}>
                <TextInput
                  secureTextEntry={true}
                  style={styles.textInput}
                  placeholder="Enter Your Password"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={passwordChangeHandler}
                  value={enteredPassword}
                />
              </View>

              {isValidLogin ? null : (
                <Text style={styles.errorMsg}>{errMsg}</Text>
              )}

              <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} onPress={signInHandler}>
                  <LinearGradient
                    colors={["#62ba46", "#008c45"]}
                    style={styles.signIn}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Log In
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUpScreen")}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#009387",
                      borderWidth: 1,
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#009387",
                      },
                    ]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.copyRight}>
              <Text style={styles.copyRightText}>
                Copyright © 2021 MyKaizen
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SignInScreen;

const { width, height } = Dimensions.get("screen");
const width_logo = width * 0.18;
const height_logo = height * 0.18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f8",
    /* borderWidth: 2,
    borderColor: "green", */
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingBottom: 0,
    /* borderWidth: 2,
    borderColor: "red", */
  },
  welcomeHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeUser: {
    color: "#009387",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  midSection: {
    flex: 3,
    /* borderWidth: 2,
    borderColor: "black", */
    paddingHorizontal: 50,
    paddingBottom: 0,
  },
  midSectionHeader: {
    marginBottom: 20,
  },
  midSectionTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    /* marginTop: Platform.OS === "ios" ? 0 : -12, */
    paddingLeft: 20,
    backgroundColor: "#ffffff",
    color: "#05375a",
    borderRadius: 10,
  },
  labelText: {
    color: "#000",
    fontSize: 18,
    paddingVertical: 5,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  copyRight: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 10,
    color: "#ddd",
    /* backgroundColor: "#000", */
  },
  copyRightText: {
    color: "#666666",
    fontSize: 12,
  },
  errorMsg: {
    /* alignSelf:'center', */
    color: "red",
    fontSize: 14,
  },
});
