import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import { ItemType, MessageItem, OrderItemType } from '../types/types';
import AddItemScreen from '../screens/myItems/AddItemScreen';
import UploadItemSuccess from '../screens/myItems/UploadItemSuccess';
import { NavigatorScreenParams } from '@react-navigation/native';
import ItemDetailScreen from '../screens/myItems/ItemDetailScreen';
import EditProfile from '../screens/profile/EditProfile';
import Earnings from '../screens/profile/Earnings';
import WithdrawSuccess from '../screens/profile/WithdrawSuccess';
import PrivacyPolicy from '../screens/profile/PrivacyPolicy';
import HelpAndSupport from '../screens/profile/HelpAndSupport';
import Chat from '../screens/message/Chat';
import PaymentMethods from '../screens/paymentMethods';

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
  Earnings: undefined;
  WithdrawSuccess: undefined;
  PrivacyPolicy: undefined;
  HelpAndSupport: undefined;
  Chat:  { item: MessageItem };
  PaymentMethods: undefined;

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
      <Stack.Screen name="Earnings" component={Earnings} />
      <Stack.Screen name="WithdrawSuccess" component={WithdrawSuccess} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
    </Stack.Navigator>
  );
};

export default MainStack;
