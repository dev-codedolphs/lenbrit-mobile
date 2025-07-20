import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import OtpVerification from '../screens/auth/OtpVerification';
import AccountCreated from '../screens/auth/AccountCreated';
import ResetPassword from '../screens/auth/ResetPassword';
import ResetPasswordSuccess from '../screens/auth/ResetPasswordSuccess';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import NewPassword from '../screens/auth/NewPassword';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  OtpVerification: { email: string };
  AccountCreated: undefined;
  ResetPassword: undefined;
  ResetPasswordSuccess: undefined;
  OnboardingScreen: undefined;
  NewPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const [initialScreen, setInitialScreen] = useState<keyof AuthStackParamList | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      setInitialScreen(hasSeenOnboarding === 'true' ? 'Login' : 'OnboardingScreen');
    };
    checkOnboardingStatus();
  }, []);

  if (!initialScreen) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialScreen}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="AccountCreated" component={AccountCreated} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ResetPasswordSuccess" component={ResetPasswordSuccess} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
