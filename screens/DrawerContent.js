import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from "../store/AuthContext";
import{ logout } from '../apiCalls';
import {getToken} from '../asyncStore';

import {
    ToolStackNavigator,
    CalendarStackNavigator,
    HomeStackNavigator,
    MedicineStackNavigator,
    SettingsStackNavigator,
  } from "../navigation/stackNavigator";
import CalendarScreen from './CalendarScreen';

export function DrawerContent(props) {

    const {dispatch} = useContext(AuthContext)
    const paperTheme = useTheme();

    const [userInfo, setUserInfo] = useState({username:'', email:''})

    //console.log(userData);
    //const {user} = await getToken();
    //console.log(userInfo)


    useEffect(() => {
        const getTokenData = async () => {
          const {user} = await getToken();
          setUserInfo({username:user.username, email:user.email})
          
        };
        getTokenData();
    }, []);


    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            
                            <Avatar.Icon backgroundColor={'#1a69b8'} size={50} icon="account" />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{userInfo.username}</Title>
                                <Caption style={styles.caption}>{userInfo.email}</Caption>
                            </View>
                        </View>

                        
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {
                                props.navigation.navigate('HomeDrawer')
                            }}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar-month-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Calendar"
                            onPress={() => {
                                props.navigation.navigate('CalendarDrawer')
                            }}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Medicine"
                            onPress={() => {props.navigation.navigate('MedicineScreen')}}
                        /> */}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cog-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {
                                props.navigation.navigate('SettingsDrawer')
                            }}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Tools"
                            onPress={() => {props.navigation.navigate('ToolsScreen')}}
                        /> */}
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Log Out"
                    onPress={() => {logout(dispatch)}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
