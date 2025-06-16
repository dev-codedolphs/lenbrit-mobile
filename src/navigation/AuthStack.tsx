import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import OtpVerification from '../screens/auth/OtpVerification';
import AccountCreated from '../screens/auth/AccountCreated';
import ResetPassword from '../screens/auth/ResetPassword';
import ResetPasswordSuccess from '../screens/auth/ResetPasswordSuccess';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import NewPassword from '../screens/auth/NewPassword';

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
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
