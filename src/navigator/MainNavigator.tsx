// src/navigation/MainNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../views/Home';
import NewsDetail from '../views/NewsDetail';
import About from '../views/About';
import Contact from '../views/Contact';
import Privacy from '../views/Privacy';
import SideMenu from '../components/Sidemenu';
import { NewsItem } from '../types/NewsItem';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<HomeStackParamList>();


export type HomeStackParamList = {
  HomeList: undefined;
  NewsDetail: { post: NewsItem };
};


const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeList" component={Home} options={{ title: 'Arctic This Week' }} />
    <Stack.Screen name="NewsDetail" component={NewsDetail} options={{ title: 'Article' }} />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />}>
    <Drawer.Screen name="AllNews" component={HomeStack} options={{title: 'Arctic This Week'}}/>
    <Drawer.Screen name="About" component={About} options={{title: 'About The Arctic Institute'}} />
    <Drawer.Screen name="Contact" component={Contact} options={{title: 'Contact'}} />
    <Drawer.Screen name="Privacy" component={Privacy} options={{title: 'Privacy Policy'}} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
