import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { SpaceMono_400Regular } from '@expo-google-fonts/space-mono';

import { AppProvider } from './context/AppContext';
import ConfigScreen from './screens/ConfigScreen';
import ResultScreen from './screens/ResultScreen';
import MenuScreen from './screens/MenuScreen';
import TermsScreen from './screens/TermsScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import InfoScreen from './screens/InfoScreen';
import DonationsScreen from './screens/DonationsScreen';
import LanguageScreen from './screens/LanguageScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    PlayfairDisplay_400Regular,
    Quicksand_400Regular,
    Quicksand_700Bold,
    SpaceMono_400Regular,
  });

  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async () => {
    try {
      const config = await AsyncStorage.getItem('userConfig');
      setInitialRoute(config ? 'Result' : 'Config');
    } catch {
      setInitialRoute('Config');
    }
  };

  if (!fontsLoaded || !initialRoute) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' }}>
          <ActivityIndicator size="large" color="#4ECDC4" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{ headerShown: false, animation: 'fade' }}
          >
            <Stack.Screen name="Config" component={ConfigScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Terms" component={TermsScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Info" component={InfoScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Donations" component={DonationsScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Language" component={LanguageScreen} options={{ animation: 'slide_from_right' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
