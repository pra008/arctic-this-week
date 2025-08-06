import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {loadTopNews} from '../actions';
import {RootState, AppDispatch} from '../store';
import {NewsItem} from '../types/NewsItem';
import {useAppTheme} from '../hooks/useAppTheme';
import {CustomText} from '../components/CustomText';

type RootStackParamList = {
  Home: undefined;
  ArticleDetail: {post: NewsItem};
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const CARD_WIDTH = screenWidth * 0.76;
const CARD_HEIGHT = screenHeight * 0.69;

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const news = useSelector((state: RootState) => state.news.items);
  const loading = useSelector((state: RootState) => state.news.loading);

  const {theme} = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    dispatch(loadTopNews());
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(loadTopNews());
    setRefreshing(false);
  };

  const getReadingTime = (text: string) => {
    const words = text?.split(/\s+/).length ?? 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const publishedNews = news.filter(post => post.published);

  const renderItem = ({item}: {item: NewsItem}) => (
    <Card
      key={item.id}
      style={[styles.card, {backgroundColor: theme.colors.background}]}
      onPress={() => navigation.navigate('ArticleDetail', {post: item})}>
      {item.imageUrl && (
        <Card.Cover
          source={{uri: item.imageUrl}}
          resizeMode="cover"
          style={styles.image}
        />
      )}
      <Card.Content>
        <CustomText
          variant="label"
          style={[styles.category, {color: theme.colors.tags}]}>
          {item.category}
        </CustomText>
        <CustomText variant="title" style={styles.title}>
          {item.title}
        </CustomText>
        {item.excerpt && (
          <CustomText variant="body" style={styles.excerpt}>
            {item.excerpt}
          </CustomText>
        )}
        <View style={styles.divider} />
        <CustomText
          variant="label"
          style={[styles.date, {color: theme.colors.subText}]}>
          {new Date(item.created * 1000).toLocaleDateString()} •{' '}
          {getReadingTime(item.content)}
        </CustomText>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.text}
          style={{marginTop: 50}}
        />
      ) : (
        <>
          <View style={styles.backgroundHalf} />
          <FlatList
            data={publishedNews}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            decelerationRate="fast"
            contentContainerStyle={styles.flatList}
            onScroll={e => {
              const offsetX = e.nativeEvent.contentOffset.x;
              const index = Math.round(offsetX / (CARD_WIDTH + 20));
              setCurrentIndex(index);
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={theme.colors.text}
              />
            }
            ItemSeparatorComponent={() => <View style={{width: 20}} />}
          />
          <View style={styles.pagination}>
            {publishedNews.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      currentIndex === index ? theme.colors.dot : 'transparent',
                    borderColor: theme.colors.dot,
                  },
                ]}
              />
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: 20,
      paddingBottom: 10,
    },
    backgroundHalf: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: screenHeight * 0.5,
      backgroundColor: theme.colors.backgroundhalf,
      zIndex: -1,
    },
    flatList: {
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: 16,
      borderWidth: theme.dark ? 1 : 0,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      overflow: 'hidden',
      elevation: 0,
    },
    image: {
      height: CARD_HEIGHT * 0.2,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    category: {
      marginTop: 8,
      fontSize: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 28,
      marginVertical: 6,
      color: theme.colors.text,
    },
    excerpt: {
      marginBottom: 8,
      color: theme.colors.text,
    },
    date: {
      fontSize: 12,
      marginTop: 8,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginTop: 10,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      borderWidth: 1.5,
      marginHorizontal: 5,
    },
  });
