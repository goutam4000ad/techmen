
const AuthReducer = (prevState, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          userData: null,
          isFetching: true,
          error: false,
          isLoggedIn: false,
          splashScreen: false
        };
      case "LOGIN_SUCCESS":
        return {
          userData: action.payload,
          isFetching: false,
          error: false,
          isLoggedIn: true,
          splashScreen: false
        };
      case "LOGIN_FAILURE":
        return {
          userData: null,
          isFetching: false,
          error: action.payload,
          isLoggedIn: false,
          splashScreen: false
        };
      case "LOGOUT_SUCCESS":
        return {
          
          userData: null,
          isFetching: false,
          error: false,
          isLoggedIn: false,
          splashScreen: false
        } 
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          isLoggedIn: true,
        }   
      case "SPLASH_SCREEN":
        return {
          ...prevState,
          splashScreen: false,
      }   
      case "FETCH_START":
        return {
          ...prevState,
          isFetching: true,
      }   
      case "FETCH_END":
        return {
          ...prevState,
          isFetching: false,
      }   
      default:
        return prevState;
    }
  };
  
  export default AuthReducer;