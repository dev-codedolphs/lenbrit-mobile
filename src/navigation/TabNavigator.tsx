import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Home from '../screens/home';
import MyItemsScreen from '../screens/myItems';
import MessageScreen from '../screens/message';
import OrdersScreen from '../screens/orders';
import ProfileScreen from '../screens/profile';
import {
  HomeActive,
  HomeIcon,
  MyItemsActive,
  MyItemsIcon,
  MessageActive,
  MessageIcon,
  OrderActive,
  OrderIcon,
  ProfileActive,
  ProfileIcon,
  CartActive,
  CartIcon,
} from '../assets/icons';
import TabIconWithLabel from '../components/TabIconWithLabel';
import Earnings from '../screens/profile/Earnings';
import MyCart from '../screens/myCart';

const Tab = createBottomTabNavigator();
const userRole = 'renter';

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#A020F0',
        tabBarInactiveTintColor: '#9DB2CE',
        headerShown: false,
        tabBarStyle: {
          height: hp('10%'),
          paddingTop: hp('2%'),
          backgroundColor: '#F7EAFF',
        },
        tabBarLabel: () => null,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIconWithLabel
              focused={focused}
              color={color}
              label="Home"
              Icon={focused ? <HomeActive color={color} /> : <HomeIcon />}
            />
          ),
        }}
      />


      {userRole === 'renter' ? (
        <Tab.Screen
          name="MyCart"
          component={MyCart}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIconWithLabel
                focused={focused}
                color={color}
                label="My Cart"
                Icon={focused ? <CartActive /> : <CartIcon />}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="MyItems"
          component={MyItemsScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIconWithLabel
                focused={focused}
                color={color}
                label="My Items"
                Icon={focused ? <MyItemsActive color={color} /> : <MyItemsIcon />}
              />
            ),
          }}
        />
      )}


      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIconWithLabel
              focused={focused}
              color={color}
              label="Message"
              Icon={focused ? <MessageActive color={color} /> : <MessageIcon />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIconWithLabel
              focused={focused}
              color={color}
              label="Orders"
              Icon={focused ? <OrderActive /> : <OrderIcon />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIconWithLabel
              focused={focused}
              color={color}
              label="Profile"
              Icon={focused ? <ProfileActive /> : <ProfileIcon />}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
