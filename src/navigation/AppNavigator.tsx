import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import AuthStack, { AuthStackParamList } from './AuthStack';
import { useSelector } from 'react-redux';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>,
  MainTabs: undefined; // This contains our tab navigator
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setHasToken(!!token);
    };

    checkToken();
  }, [isLoggedIn]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} key={`${isLoggedIn}-${hasToken}`}>
      {(isLoggedIn || hasToken) ? (
        <Stack.Screen name="MainTabs" component={MainStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};