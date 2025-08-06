// src/navigation/MainNavigator.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';

import {useAppTheme} from '../hooks/useAppTheme';
import {RootState} from '../store';
import HomeNavigator from './HomeNavigator';
import PodcastStackNavigator from './PodcastStackNavigator';
import SettingsNavigator from './SettingsNavigator';

const Tab = createBottomTabNavigator();

const iconSizeMap = {
  small: 20,
  medium: 24,
  large: 28,
};

const TabIcon = ({
  source,
  tintColor,
  size,
}: {
  source: any;
  tintColor: string;
  size: number;
}) => (
  <Image
    source={source}
    style={{width: size, height: size, tintColor}}
    resizeMode="contain"
  />
);

const MainNavigator = () => {
  const {theme} = useAppTheme();
  const textSize = useSelector((state: RootState) => state.textSize.size);
  const iconSize = iconSizeMap[textSize];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: theme.colors.background},
        tabBarActiveTintColor: theme.colors.navigationActive,
        tabBarInactiveTintColor: theme.colors.navigationInactive,
        tabBarIcon: ({color}) => {
          let iconSource;
          switch (route.name) {
            case 'Podcast':
              iconSource = require('../assets/icons/podcast.png');
              break;
            case 'Home':
              iconSource = require('../assets/icons/home.png');
              break;
            case 'Settings':
              iconSource = require('../assets/icons/settings.png');
              break;
            default:
              iconSource = require('../assets/icons/home.png');
          }
          return (
            <TabIcon source={iconSource} tintColor={color} size={iconSize} />
          );
        },
      })}>
      <Tab.Screen name="Podcast" component={PodcastStackNavigator} />
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
