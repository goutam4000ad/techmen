import React, { useState, useContext, useReducer } from 'react';
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
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native";

import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {AuthContext} from "../store/AuthContext"

const signUpUrl = "https://3n7u6zk0bf.execute-api.us-east-2.amazonaws.com/Dev/register";


const validateEmail = (text) => {
  //console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  }
  else {
    return true;
  }
}

const UserNameReducer = (prevState, action) =>{
  switch (action.type){
    case 'USER_INPUT':
      return{
        ...prevState,
        value: action.val,
        
      }
    case 'USER_BLUR':
      return{
        ...prevState,
        isValid: prevState.value == ''?false:true
      }  
  }

}


const EmailReducer = (prevState, action) =>{
  switch (action.type){
    case 'USER_INPUT':
      return{
        ...prevState,
        value: action.val,
        
      }
    case 'USER_BLUR':
      return{
        ...prevState,
        isValid: validateEmail(prevState.value)
      }  
  }

}
const PasswordReducer = (prevState, action) =>{
  switch (action.type){
    case 'USER_INPUT':
      return{
        ...prevState,
        value: action.val,
        
      }
    case 'USER_BLUR':
      return{
        ...prevState,
        isValid: prevState.value.length < 6 ? false:true
      }  
  }

}

const SignUpScreen = ({navigation}) => {
  
  const [isServerErr, setIsServerErr] = useState(false);
  const [errMsgServer, setErrMsgServer] = useState('');

  const {isFetching, dispatch} = useContext(AuthContext)
  

  const [UserNameState, dispatchUserName] = useReducer( UserNameReducer, {
    value:'',
    isValid: true,
    msg:'Please enter your name'
  })

  const [EmailState, dispatchEmail] = useReducer( EmailReducer, {
    value:'',
    isValid: true,
    msg:'Please enter a valid Email'
  })
  const [PasswordState, dispatchPassword] = useReducer( PasswordReducer, {
    value:'',
    isValid: true,
    msg:'Password should be atleast 6 characters long'
  })

        
  const userNameChangeHandler = (val)=>{
    //console.log(val)
    dispatchUserName({type:'USER_INPUT', val});
    
  }
  const emailChangeHandler = (val)=>{
    
    dispatchEmail({type:'USER_INPUT', val});
  }
  const passwordChangeHandler = (val)=>{
    dispatchPassword({type:'USER_INPUT', val})
  }  
  /* const passwordConfirmChangeHandler = (val)=>{
    setenteredComfirmPassword(val);
  }   */
  

  const userNameValidateHandler = () =>{
    dispatchUserName({type:'USER_BLUR'});
    
  }
  const emailValidateHandler = () =>{
    dispatchEmail({type:'USER_BLUR'});
    
  }
  const passwordValidateHandler = () =>{
    dispatchPassword({type:'USER_BLUR'});
    
  }
  
  const signUpHandler = async () => {
    //console.log(enteredUserName);
    dispatchUserName({type:'USER_BLUR'});
    dispatchEmail({type:'USER_BLUR'});
    dispatchPassword({type:'USER_BLUR'});

    if( !UserNameState.isValid || !EmailState.isValid || !PasswordState.isValid ){
      console.log('validation error');
      
      return;
    }
    const enteredUserName = UserNameState.value;
    const enteredEmail = EmailState.value;
    const enteredPassword = PasswordState.value;
    
    //console.log(enteredEmail, enteredUserName, enteredPassword);

    const requestConfig = {
      headers:{
        'x-api-key': 'iu8H1EH1ORiJMKXW6YnJ9IS9wR4LVY78ZJlYin34'
      }
    }

    const requestBody = {
      username: enteredUserName,
      email: enteredEmail,
      password: enteredPassword
    }
    //console.log('reqBody==', requestBody);
    try {
      dispatch({ type: "FETCH_START" });
      const signUpRes = await axios.post(signUpUrl, requestBody, requestConfig);
      dispatch({ type: "FETCH_END" });
      //console.log(signUpRes.data);
      if(signUpRes.status == 201){ 
        navigation.navigate('SignInScreen', {username:signUpRes.data.username, email:signUpRes.data.email});
      }
      else{
        
        setIsServerErr(true);
        setErrMsgServer(signUpRes.data.message)
        
      }
    } catch (err) {
        dispatch({ type: "FETCH_END" });
        setIsServerErr(true);
        setErrMsgServer(err.message);
        console.log(err.message);
    }
    

  }

  if( isFetching ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  
  return (
    <KeyboardAvoidingView style={{flex:1}}> 
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='always'>
    <TouchableWithoutFeedback  accessible={false} onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      
      <View style={styles.header}>
        <Image
          source={require("../assets/login/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      
      <View style={styles.midSection}>
        
        <View style={styles.midSectionHeader}>
          <Text style={styles.midSectionTitle}>Sign up</Text>
        </View>
        
        
        <Text style={styles.labelText}>Your Name</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Name"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            onChangeText= {userNameChangeHandler}
            onEndEditing= {userNameValidateHandler}
            value= {UserNameState.value}
          />
        </View>
        
        { UserNameState.isValid ? null : 
            
            <Text style={styles.errorMsg}>{UserNameState.msg}</Text>
            
        }
        
        
        <Text style={styles.labelText}>Email</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Email"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            onChangeText= {emailChangeHandler}
            onEndEditing= {emailValidateHandler}
            value= {EmailState.value}
          />
        </View>
        
        { EmailState.isValid ? null : 
            
            <Text style={styles.errorMsg}>{EmailState.msg}</Text>
            
        }

        <Text style={styles.labelText}>Password</Text>
        <View style={styles.action}>
          <TextInput
            secureTextEntry = {true}
            style={styles.textInput}
            placeholder="Enter Your Password"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            onChangeText= {passwordChangeHandler}
            onEndEditing= {passwordValidateHandler}
            value= {PasswordState.value}
          />
        </View>
        { PasswordState.isValid ? null : 
            
            <Text style={styles.errorMsg}>{PasswordState.msg}</Text>
            
        }


        {/* <Text style={styles.labelText}>Confirm Password</Text>
        <View style={styles.action}>
          <TextInput
            secureTextEntry = {true}
            style={styles.textInput}
            placeholder="Confirm Your Password"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            onChangeText= {passwordConfirmChangeHandler}
            value= {enteredComfirmPassword}
          />
        </View>

        { isValidConfirmPassword ? null : 
            
            <Text style={styles.errorMsg}>{errMsgConfirmPassword}</Text>
            
        } */}

        
        { !isServerErr ? null : 
            
            <Text style={styles.errorMsgServer}>{errMsgServer}</Text>
            
        }
        {/* <Text style={styles.errorMsgServer}>Server Error</Text> */}
        
        <View style={styles.button}>
          <TouchableOpacity
              style={styles.signIn}
              onPress={signUpHandler}
          >
          <LinearGradient
              colors={['#62ba46', '#008c45']}
              style={styles.signIn}
          >
              <Text style={[styles.textSign, {
                  color:'#fff'
              }]}>Sign Up</Text>
          </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
              style={[styles.signIn, {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15
              }]}
          >
              <Text style={[styles.textSign, {
                  color: '#009387'
              }]}>Log In</Text>
          </TouchableOpacity>
        </View>
            
      </View>
      
      <View style={styles.copyRight}>
        <Text style={styles.copyRightText}>Copyright © 2021 MyKaizen</Text>
      </View>
           
    </View>
    </TouchableWithoutFeedback>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SignUpScreen; 

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
  scrollContainer:{
    flexGrow:1
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
    marginBottom: 20
  },
  midSectionTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  labelText: {
    color: '#000',
    fontSize: 18,
    paddingVertical: 10
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    marginBottom:3,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10
  },
  textInput: {
    flex: 1,
    /* marginTop: Platform.OS === "ios" ? 0 : -12, */
    paddingLeft: 20,
    backgroundColor: "#ffffff",
    color: "#05375a",
    borderRadius: 10
  },
  
  button: {
    alignItems: 'center',
    marginTop: 30
  },
  errorMsg: {
    /* alignSelf:'center', */
    color: 'red',
    fontSize: 14,
  },
  errorMsgServer:{
    alignSelf:'center',
    marginTop: 15,
    color: 'red',
    fontSize: 14,
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  copyRight:{
    flex:1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 10,
    color: "#ddd",
    /* backgroundColor: "#000", */
  },
  copyRightText:{
    color: "#666666",
    fontSize: 12
  }

});
   

