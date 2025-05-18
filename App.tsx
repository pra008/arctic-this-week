import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideMenu from './src/components/Sidemenu';
import About from './src/views/About';
import Contact from './src/views/Contact';
import Home from './src/views/Home';
import Privacy from './src/views/Privacy';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  
  <Drawer.Navigator
    drawerContent={(props) => <SideMenu {...props} />}
    screenOptions={{
      headerShown: true, // Show headers for all screens in the drawer
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { fontFamily: 'knile-semibold', fontSize: 18 },
      
    }}
  >
    <Drawer.Screen name="AllNews" component={Home} options={{ title: 'Arctic This Week' }} />
    <Drawer.Screen name="About" component={About} options={{ title: 'About The Arctic Institute' }} />
    <Drawer.Screen name="Contact" component={Contact} options={{ title: 'Contact' }} />
    <Drawer.Screen name="Privacy" component={Privacy} options={{ title: 'Privacy Policy' }} />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>

  );
}
