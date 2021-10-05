import { storeToken, deleteToken } from "./asyncStore";
import axios from "axios";

const signInUrl =
  "https://3n7u6zk0bf.execute-api.us-east-2.amazonaws.com/Dev/login";
const requestConfig = {
  headers: {
    "x-api-key": "iu8H1EH1ORiJMKXW6YnJ9IS9wR4LVY78ZJlYin34",
  },
};

export const loginCall = async (userCredentials, dispatch) => {
  console.log('userInfo=='+JSON.stringify(userCredentials)) 
  const requestBody = JSON.stringify(userCredentials);
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(signInUrl, requestBody, requestConfig);
    console.log("res=", res);
    
    if(res.errorCode == ''){
      storeToken(res.data.token);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
    } 
  } catch (err) {
    console.log("err=", err);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }

  /* dispatch({ type: "LOGIN_START" });
  res= {
    data:{
      userCredentials
    }
  }
  storeToken(res.data);
  dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); */
};

export const logout = async (dispatch) => {
  res = {
    data: "",
  };
  const tokenDel = await deleteToken();
  if (tokenDel) dispatch({ type: "LOGOUT_SUCCESS", payload: res.data });
};
