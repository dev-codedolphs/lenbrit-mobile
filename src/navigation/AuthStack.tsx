import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import OtpVerification from '../screens/auth/OtpVerification';
import AccountCreated from '../screens/auth/AccountCreated';
import ResetPassword from '../screens/auth/ResetPassword';
import ResetPasswordSuccess from '../screens/auth/ResetPasswordSuccess';

const Auth = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="OtpVerification" component={OtpVerification} />
      <Auth.Screen name="AccountCreated" component={AccountCreated} />
      <Auth.Screen name="ResetPassword" component={ResetPassword} />
      <Auth.Screen name="ResetPasswordSuccess" component={ResetPasswordSuccess} />
    </Auth.Navigator>
  );
};

export default AuthStack;
