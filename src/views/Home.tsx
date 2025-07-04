import React, { useEffect, useState, useMemo } from 'react';
import {
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { loadTopNews } from '../actions';
import { RootState, AppDispatch } from '../store';
import { NewsItem } from '../types/NewsItem';
import { useAppTheme } from '../hooks/useAppTheme';
import { CustomText } from '../components/CustomText';

type RootStackParamList = {
  Home: undefined;
  ArticleDetail: { post: NewsItem };
};

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const news = useSelector((state: RootState) => state.news.items);
  const loading = useSelector((state: RootState) => state.news.loading);

  const { theme } = useAppTheme();
  const paperTheme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
      return <CustomText variant="body" style={styles.message}>No news available.</CustomText>;
    }

    const publishedNews = news.filter(post => post.published);

    if (publishedNews.length === 0) {
      return <CustomText variant="body" style={styles.message}>No published articles available.</CustomText>;
    }

    return publishedNews.map(post => (
      <Card
        key={post.id}
        style={[styles.card, { backgroundColor: paperTheme.colors.elevation.level1 }]}
        onPress={() => navigation.navigate('ArticleDetail', { post })}
      >
        {post.imageUrl && (
          <Card.Cover
            source={{ uri: post.imageUrl }}
            resizeMode="cover"
            style={{ height: 180 }}
          />
        )}
        <Card.Content>
          <CustomText variant="label" style={[styles.category, { color: paperTheme.colors.primary }]}>
            {post.category}
          </CustomText>

          <CustomText variant="title" style={styles.title}>
            {post.title}
          </CustomText>

          {post.excerpt && (
            <CustomText variant="body" style={styles.excerpt}>
              {post.excerpt}
            </CustomText>
          )}

          <CustomText variant="label" style={[styles.date, { color: paperTheme.colors.outline }]}>
            {new Date(post.created * 1000).toLocaleDateString()}
          </CustomText>
        </Card.Content>
      </Card>
    ));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={theme.colors.text}
        />
      }
    >
      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.text}
          style={{ marginTop: 50 }}
        />
      ) : (
        renderNews()
      )}
    </ScrollView>
  );
};

export default Home;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 54,
      backgroundColor: theme.colors.background,
    } as ViewStyle,

    content: {
      paddingBottom: 30,
    } as ViewStyle,

    message: {
      textAlign: 'center',
      marginTop: 30,
    } as ViewStyle,

    card: {
      marginBottom: 20,
      borderRadius: 10,
      overflow: 'hidden',
    } as ViewStyle,

    category: {
      marginTop: 8,
      fontSize: 12,
    },

    title: {
      fontWeight: 'bold',
      marginVertical: 6,
    },

    excerpt: {
      marginBottom: 8,
    },

    date: {
      fontSize: 12,
    },
  });

