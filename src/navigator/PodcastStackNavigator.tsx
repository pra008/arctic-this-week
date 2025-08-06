import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import {CustomText} from '../components/CustomText';
import PodcastNavigator from './PodcastNavigator';

export type PodcastStackParamList = {
  PodcastMain: undefined;
};

const Stack = createNativeStackNavigator<PodcastStackParamList>();

const PodcastStackNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PodcastMain"
      component={PodcastNavigator}
      options={{
        headerTitle: () => (
          <CustomText
            variant="title"
            style={{fontWeight: 'bold'}}
            allowFontScaling>
            Podcast
          </CustomText>
        ),
        headerLeft: () => (
          <Image
            source={require('../images/logo.png')}
            style={{
              width: 28,
              height: 28,
              marginLeft: 12,
              marginRight: 8,
            }}
            resizeMode="contain"
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default PodcastStackNavigator;
