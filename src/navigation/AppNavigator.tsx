import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';

export type RootStackParamList = {
  AuthStack: undefined,
  MainTabs: undefined; // This contains our tab navigator
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};