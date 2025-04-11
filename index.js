import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen01 from './Screens/Screen01';
import Screen02 from './Screens/Screen02';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { height: 60, paddingBottom: 5 },
        }}
      >
        <Tab.Screen name="Home" component={Screen01} />
        <Tab.Screen name="Explore" component={Screen02} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
