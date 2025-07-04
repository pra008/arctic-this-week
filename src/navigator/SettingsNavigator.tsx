import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../views/Settings';
import About from '../views/About';
import Privacy from '../views/Privacy';
import Contact from '../views/Contact';

export type SettingsStackParamList = {
  SettingsMain: undefined;
  About: undefined;
  Privacy: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SettingsMain"
      component={Settings}
      options={{title: 'Settings'}}
    />
    <Stack.Screen name="About" component={About} />
    <Stack.Screen name="Privacy" component={Privacy} />
    <Stack.Screen name="Contact" component={Contact} />
  </Stack.Navigator>
);

export default SettingsStackNavigator;
