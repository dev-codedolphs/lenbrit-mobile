import React, { useState, useEffect } from 'react';
import {  StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/splash/SplashScreen';
import Toast from 'react-native-toast-message';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { AppNavigator } from './src/navigation/AppNavigator';
import { navigationRef } from './src/utils/navigate';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: 'white',
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer ref={navigationRef}>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <AppNavigator />
        )}
      </NavigationContainer>
      <Toast />   
    </SafeAreaProvider>
  );
}

export default App;
