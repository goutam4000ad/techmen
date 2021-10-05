import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ToolsScreen from "../screens/ToolsScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  ToolStackNavigator,
  CalendarStackNavigator,
  HomeStackNavigator,
  MedicineStackNavigator,
  SettingsStackNavigator,
} from "./stackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({route,navigation}) => {
  //console.log(route);
  //console.log(navigation);
  return (
    <Tab.Navigator 
      initialRouteName="ToolsTab" 
      /* tabBarOptions={{tabStyle: { borderTopWidth: 0 }, style: { borderTopWidth: 0} }} */
      screenOptions={{
        headerShown: false, 
        showLabel:false,
        tabBarStyle:{
          position:'absolute',
          height:70,
          backgroundColor:'#fff',
          borderBottomLeftRadius:20,
          borderBottomRightRadius:20,
          borderTopLeftRadius:10,
          borderTopRightRadius:10,
          elevation:0,
          borderWidth:0,
          borderTopWidth: 0,
          
        },
      }}
      
      /* tabBar={props => <MyTabBar {...props} />} */
    >
      <Tab.Screen
        name="ToolsTab"
        component={ToolStackNavigator}
        
        options={{
          headerMode: false, 
          tabBarShowLabel:false,
          tabBarItemStyle:{
            backgroundColor:'#1a69b8',
            borderTopLeftRadius:10,
            borderBottomLeftRadius:20,
            
          },
          tabBarIcon: ({ focused })=>(  
              <View style={{
                width:40,
                height:40,
                borderRadius:10,
                alignItems:'center', 
                justifyContent:'center', 
                backgroundColor:focused ? '#044d95' : 'none'
              }}
              >
                <Image 
                  source={require('../assets/tab/tool.png')}
                  resizeMode='contain'
                  style= {{
                    width:25,
                    height:25,
                    
                  }}
                />
              </View>
          )
          
        }}
      />
      <Tab.Screen 
        name="CalendarTab" 
        component={CalendarStackNavigator} 
        options={{
          headerMode: false, 
          tabBarLabel:'Calendar',  
          tabBarShowLabel:false,
          tabBarItemStyle:{
            backgroundColor:'#1a69b8',
            borderTopRightRadius:15,
          },
          tabBarIcon: ({ focused })=>(  
              <View style={{
                width:40,
                height:40,
                borderRadius:10,
                alignItems:'center', 
                justifyContent:'center', 
                backgroundColor:focused ? '#044d95' : 'none'
              }}
              >
                <Image 
                  source={require('../assets/tab/calendar.png')}
                  resizeMode='contain'
                  style= {{
                    width:25,
                    height:25,
                    
                  }}
                />
              </View>
          )
          
        }}
      />
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator} 
        options={{
          headerMode: false, 
          tabBarLabel:'Home',  
          tabBarShowLabel:false,
          tabBarItemStyle:{
            backgroundColor:'#1a69b8',
            flex:1,
            
          },
          tabBarIcon: ({ focused })=>(  
            
              <View  style={{
                /* width:80,
                height:66, */
                
                
                width:'100%',
                height:64,
                bottom:4,
                
                backgroundColor:'#fff',
                borderBottomLeftRadius:35,
                borderBottomRightRadius:35,
                alignItems:'center', 
                justifyContent:'center',
                
              }}
              >
                <View style={{
                  width:50,
                  height:50,
                  borderRadius:25,
                  alignItems:'center', 
                  justifyContent:'center', 
                  backgroundColor:focused ? '#fff' : '#fff',
                  position:'absolute',
                  ...styles.shadow,
                }}
                >  
                  
                  
                    <Image 
                      source={require('../assets/tab/house.png')}
                      resizeMode='contain'
                      style= {{
                        width:25,
                        height:25,
                        
                      }}
                    />
                  
                </View>  
              </View>
            
            
          )
          
        }}
      />

      <Tab.Screen 
        name="MedicineTab" 
        component={MedicineStackNavigator} 
        options={{
          tabBarLabel:'Medicine',  
          tabBarShowLabel:false,
          tabBarItemStyle:{
            backgroundColor:'#1a69b8',
            borderTopLeftRadius:15,
            
          },
          tabBarIcon: ({ focused })=>(  
              <View style={{
                width:40,
                height:40,
                borderRadius:10,
                alignItems:'center', 
                justifyContent:'center', 
                backgroundColor:focused ? '#044d95' : 'none'
              }}
              >
                <Image 
                  source={require('../assets/tab/medicine.png')}
                  resizeMode='contain'
                  style= {{
                    width:25,
                    height:25,
                    
                  }}
                />
              </View>
          )
          
        }}
      />
      <Tab.Screen 
        name="SettingsTab" 
        component={SettingsStackNavigator} 
        options={{
          headerMode: false, 
          tabBarLabel:'Settings',  
          tabBarShowLabel:false,
          tabBarItemStyle:{
            backgroundColor:'#1a69b8',
            borderTopRightRadius:10,
            borderBottomRightRadius:20,
          },
          tabBarIcon: ({ focused })=>(  
              <View style={{
                width:40,
                height:40,
                borderRadius:10,
                alignItems:'center', 
                justifyContent:'center', 
                backgroundColor:focused ? '#044d95' : 'none'
              }}
              >
                <Image 
                  source={require('../assets/tab/settings.png')}
                  resizeMode='contain'
                  style= {{
                    width:25,
                    height:25,
                    
                  }}
                />
              </View>
          )
          
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;


const styles = StyleSheet.create({
  shadow:{
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:1
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation:2
  }
})