import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import { ItemType, OrderItemType } from '../types/types';
import AddItemScreen from '../screens/myItems/AddItemScreen';
import UploadItemSuccess from '../screens/myItems/UploadItemSuccess';
import { NavigatorScreenParams } from '@react-navigation/native';
import ItemDetailScreen from '../screens/myItems/ItemDetailScreen';
import EditProfile from '../screens/profile/EditProfile';

export type TabsParamList = {
  Home: undefined;
  MyItems: undefined;
  Orders: undefined;
  Message: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>;
  OrderDetail: { item: OrderItemType };
  AddItem: undefined;
  ItemDetail: { item: ItemType};
  UploadItemSuccess: undefined;
  EditProfile: undefined;

};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="AddItem" component={AddItemScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
      <Stack.Screen name="UploadItemSuccess" component={UploadItemSuccess} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default MainStack;
