import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import AuthStack, { AuthStackParamList } from './AuthStack';
import { useDispatch, useSelector } from 'react-redux';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigatorScreenParams } from '@react-navigation/native';
import authSlice from '../screens/auth/redux/Slice';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>,
  MainTabs: undefined; // This contains our tab navigator
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        dispatch(authSlice.actions.loginSuccess({ token }));
      }
      setCheckingToken(false);
    };
    checkToken();
  }, []);

  if (checkingToken) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} key={`${isLoggedIn}`}>
      {isLoggedIn ? (
        <Stack.Screen name="MainTabs" component={MainStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};