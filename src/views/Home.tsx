import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Text, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {loadTopNews} from '../actions';
import {RootState, AppDispatch} from '../store';
import {NewsItem} from '../types/NewsItem';
import {useAppTheme} from '../hooks/useAppTheme';
type RootStackParamList = {
  Home: undefined;
  NewsDetail: {post: NewsItem};
  // add other routes here if needed
};

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const news = useSelector((state: RootState) => state.news.items);
  const loading = useSelector((state: RootState) => state.news.loading);

  const {styles, theme} = useAppTheme();
  const paperTheme = useTheme();

  useEffect(() => {
    dispatch(loadTopNews());
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(loadTopNews());
    setRefreshing(false);
  };

  const renderNews = () => {
    if (!news || news.length === 0) {
      return <Text style={styles.message}>No news available.</Text>;
    }

    const publishedNews = news.filter(post => post.published);

    if (publishedNews.length === 0) {
      return (
        <Text style={styles.message}>No published articles available.</Text>
      );
    }

    return publishedNews.map(post => (
      <Card
        key={post.id}
        style={{
          marginBottom: 16,
          backgroundColor: paperTheme.colors.elevation.level1, // ← better than `background`
        }}
        onPress={() => navigation.navigate('NewsDetail', {post})}>
        {post.imageUrl && (
          <Card.Cover
            source={{uri: post.imageUrl}}
            resizeMode="cover"
            style={{height: 180}}
          />
        )}
        <Card.Content>
          <Text
            style={{
              color: paperTheme.colors.primary,
              marginTop: 8,
              fontSize: 12,
            }}>
            {post.category}
          </Text>
          <Text
            variant="titleLarge"
            style={{fontWeight: 'bold', marginVertical: 6}}>
            {post.title}
          </Text>
          {post.excerpt ? (
            <Text variant="bodyMedium" style={{marginBottom: 8}}>
              {post.excerpt}
            </Text>
          ) : null}
          <Text variant="labelSmall" style={{color: paperTheme.colors.outline}}>
            {new Date(post.created * 1000).toLocaleDateString()}
          </Text>
        </Card.Content>
      </Card>
    ));
  };
  return (
    <ScrollView
      style={styles.mainView} // consistent with About, Contact
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={theme.colors.text}
        />
      }>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.text}
          style={{marginTop: 50}}
        />
      ) : (
        renderNews()
      )}
    </ScrollView>
  );
};

export default Home;
