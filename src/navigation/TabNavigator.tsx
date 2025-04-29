import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Settings from '../screens/setting';
import { HomeIcon, SettingIcon, AnalyticsIcon, MosaicIcon } from '../assets/icons';
import Login from '../screens/auth/Login';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#76A443',
        tabBarInactiveTintColor: '#1A1A1A',
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}
    >
      <Tab.Screen 
        name="Login" 
        component={Login}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} />,
        }}
      />

      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} />,
        }}
      />

      <Tab.Screen 
        name="Settings" 
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => <SettingIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}