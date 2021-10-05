import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../screens/DrawerContent";
import BottomTabNavigator from "./tabNavigator";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ToolsScreen from "../screens/ToolsScreen";
import MedicineScreen from "../screens/MedicineScreen";
import CalendarScreen from "../screens/CalendarScreen";

import { CalendarStackNavigator } from "./stackNavigator";
const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  
  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#1a69b8",
      
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
    headerShown: false,
    
  };
  
  return(
  <Drawer.Navigator 
    screenOptions={screenOptionStyle}
    drawerContent={(props) => <DrawerContent {...props} />}
    
 
  >
    <Drawer.Screen name="HomeDrawer" component={BottomTabNavigator} />
    <Drawer.Screen name="CalendarDrawer" component={CalendarScreen}   />
    <Drawer.Screen name="SettingsDrawer" component={SettingsScreen}  />
    
    {/* <Drawer.Screen name="HomeScreen" component={BottomTabNavigator} options={{headerShown: true,title:'Home'}} />
    <Drawer.Screen name="CalendarScreen" component={CalendarScreen} options={{headerShown: true,title:'Calendar'}}  />
    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: true,title:'Settings'}} />
    
    <Drawer.Screen name="MedicineScreen" component={MedicineScreen} options={{headerShown: true,title:'Medicine'}} />
    <Drawer.Screen name="ToolsScreen" component={ToolsScreen} options={{headerShown: true,title:'Tools'}} /> */}

    
  </Drawer.Navigator>

  )
};

