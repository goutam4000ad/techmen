import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";

const CalendarScreen = ({navigation}) => {
  return (
    <View style={styles.center}>
      <StatusBar backgroundColor="#044d95" barStyle="light-content" />
      <Text style={styles.info}>Thankyou for registering with us. Stay tuned for upcoming features - Stay Safe</Text>
      
    </View>
  );
};
export default CalendarScreen;
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor:'#fff',
    paddingHorizontal:40,
  },
  info:{
    fontSize:16,

  }
});
