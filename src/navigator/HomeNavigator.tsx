import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../views/Home';
import ArticleDetail from '../views/ArticleDetail';
import { NewsItem } from '../types/NewsItem';

export type HomeStackParamList = {
  HomeList: undefined;
  ArticleDetail: { post: NewsItem };
};


const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeList" component={Home} />
    <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
  </Stack.Navigator>
);

export default HomeNavigator;
