import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import TimeAgo from 'react-native-timeago';
import HeroImage from '../components/hero-image';
import { loadAllNews } from '../actions';


const Home: React.FC = () => {
  const [image, setImage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const news = useSelector((state: RootState) => state.news.items);
  const loading = useSelector((state: RootState) => state.news.loading);

  useEffect(() => {
    dispatch(loadAllNews());
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const response = await fetch(
        'http://app.thearcticinstitute.org/wp-json/wp/v2/media?per_page=1&orderby=date'
      );

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Expected JSON but got different content type');
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setImage(data[0].guid.rendered);
      }
    } catch (error) {
      console.error('Error loading hero image:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(loadAllNews());
    setRefreshing(false);
  };

  const renderNews = () => {
    if (!news || news.length === 0) {
      return (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
          No news available.
        </Text>
      );
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return news.map((post) => (
      <TouchableOpacity
        key={post._id}
        onPress={() => navigation.navigate('SwipeView', { newsProps: { post } })}
      >
        <View style={styles.newsBlock}>
          <Text style={styles.newsTitle}>{post.title}</Text>
          <Text style={styles.metaData}>
            <TimeAgo time={new Date(post._created * 1000)} /> | {post.category || 'Unknown'}
          </Text>
          <Text style={styles.newsExcerpt}>
            {post.excerpt || 'No excerpt available.'}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ marginTop: 54 }}>
      {loading || image === '' ? (
        <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#7b7c7f" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
          <HeroImage imageUrl={image} />
          <Animated.View
            style={{
              marginTop: 20,
              marginBottom: -25,
              opacity: fadeAnim,
            }}
          >
            {renderNews()}
          </Animated.View>
        </ScrollView>
      )}
    </View>
  );
};

export default Home;


const styles = StyleSheet.create({
  newsBlock: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#F3F3F3',
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 20,
  },
  newsTitle: {
    fontFamily: 'knile-semibolditalic',
    color: '#000000',
    fontSize: 16,
    marginBottom: 2,
  },
  metaData: {
    fontFamily: 'calendas_plus_italic',
    fontSize: 10,
    marginBottom: 5,
  },
  newsExcerpt: {
    fontFamily: 'calendas_plus',
    fontSize: 14,
  },
});
