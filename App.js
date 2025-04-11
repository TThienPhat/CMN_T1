import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './AuthContext';
import Screen01 from './Screens/Screen01';
import Screen02 from './Screens/Screen02';
import Screen03 from './Screens/Screen03';
import Screen04 from './Screens/Screen04';
import '@expo/metro-runtime';
import { registerRootComponent } from 'expo';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Screen01"
          screenOptions={{
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen 
            name="Screen01" 
            component={Screen01} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Screen02" 
            component={Screen02} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Screen03" 
            component={Screen03} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Screen04" 
            component={Screen04} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

registerRootComponent(App);

export default App;