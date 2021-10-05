import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  userData: {
    
  },
  isFetching: false,
  error: false,
  isLoggedIn: false,
  splashScreen: true
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        userData: state.userData,
        isFetching: state.isFetching,
        error: state.error,
        isLoggedIn: state.isLoggedIn,
        splashScreen: state.splashScreen,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};