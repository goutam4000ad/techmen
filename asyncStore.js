import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (data) => {
  try {
      await AsyncStorage.setItem("userData", JSON.stringify(data));
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
export const getToken = async () => {
  try {
    let userData = await AsyncStorage.getItem("userData");
    let data = JSON.parse(userData);
    //console.log(data);
    return data;
  } catch (error) {
    console.log("Something went wrong", error);
    return false;
  }
}

export const deleteToken = async() => {
  try {
    await AsyncStorage.removeItem("userData");
    return true;
  }
  catch(exception) {
      return false;
  }
}