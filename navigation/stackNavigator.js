import React from "react";
import { View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Ionicons';
import {IconButton} from "react-native-paper"

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import MedicineScreen from "../screens/MedicineScreen";
import ToolsScreen from "../screens/ToolsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const ToolStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MedicineStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#1a69b8",
    
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerShown: true,
  
};
const HeaderLeft = ({navigation}) => {
  return (
    <View style={{left:10, marginRight:10}}> 
     <Icon.Button
     backgroundColor={'#044d95'}
     borderRadius={5}
     color={'#fff'}
     iconStyle={{paddingHorizontal:3}}
     name="ios-menu"
     onPress={() => navigation.openDrawer()}
     size={20}
     style={{paddingRight:0}}
     />
   </View>
  )
}

const ToolStackNavigator = ({navigation}) => {
  return (
    <ToolStack.Navigator 
      screenOptions={screenOptionStyle}
    >
      <ToolStack.Screen name="ToolScreen" component={ToolsScreen} 
        options={{
          title:'Overview',
          headerLeft: () => (<HeaderLeft navigation={navigation} />) 
          }} 
      />
      
    </ToolStack.Navigator>
  );
}

const CalendarStackNavigator = ({navigation}) => {
  return (
    <CalendarStack.Navigator screenOptions={screenOptionStyle}>
      <CalendarStack.Screen name="CalendarScreen" component={CalendarScreen} 
        options={{
          title:'Calendar',
          headerLeft: () => (<HeaderLeft navigation={navigation}  />) 
        }} />
    </CalendarStack.Navigator>
  );
}
const HomeStackNavigator = ({navigation}) => {
  return (
    <HomeStack.Navigator screenOptions={screenOptionStyle}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} 
        options={{
          title:'Home',
          headerLeft: () => (<HeaderLeft navigation={navigation}  />) 
        }}  />
    </HomeStack.Navigator>
  );
}
const MedicineStackNavigator = ({navigation}) => {
  return (
    <MedicineStack.Navigator screenOptions={screenOptionStyle}>
      <MedicineStack.Screen name="MedicineScreen" component={MedicineScreen}
        options={{
         title:'Medicine',
         headerLeft: () => (<HeaderLeft navigation={navigation}  />) 
        }}  />
    </MedicineStack.Navigator>
  );
}
const SettingsStackNavigator = ({navigation}) => {
  return (
    <SettingsStack.Navigator screenOptions={screenOptionStyle}>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen}
        options={{
         title:'Settings',
         headerLeft: () => (<HeaderLeft navigation={navigation}  />) 
        }}  />
    </SettingsStack.Navigator>
  );
}

export { ToolStackNavigator, CalendarStackNavigator, HomeStackNavigator, MedicineStackNavigator, SettingsStackNavigator };