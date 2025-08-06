import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import ArticleDetail from '../views/ArticleDetail';
import {NewsItem} from '../types/NewsItem';
import {Image} from 'react-native';
import {CustomText} from '../components/CustomText';
import PodcastNavigator from './PodcastNavigator';

export type HomeStackParamList = {
  HomeList: undefined;
  ArticleDetail: {post: NewsItem};
  PodcastNavigator: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeList"
      component={Home}
      options={() => ({
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
        headerTitle: () => (
          <CustomText
            variant="title"
            style={{fontWeight: 'bold'}}
            allowFontScaling>
            The Arctic This Week
          </CustomText>
        ),
      })}
    />

    <Stack.Screen
      name="ArticleDetail"
      component={ArticleDetail}
      options={({route}) => {
        const title = route.params.post.title;
        return {
          title: title.length > 30 ? `${title.substring(0, 30)}...` : title,
        };
      }}
    />

    <Stack.Screen
      name="PodcastNavigator"
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

export default HomeNavigator;
