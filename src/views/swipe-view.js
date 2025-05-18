import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import SingleItem from './Single-item';

const styles = StyleSheet.create({
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

const SwipeView = ({ route }) => {
  // Safely access route.params
  const newsProps = route?.params?.newsProps;

  const renderPost = () => {
    // Check if newsProps or posts are empty
    if (!newsProps || !newsProps.post || newsProps.post.length === 0) {
      return (
        <View>
          <Text style={styles.emptyMessage}>No posts available</Text>
        </View>
      );
    }

    return newsProps.post.map((post) => (
      <View key={post.id}>
        <SingleItem post={post} />
      </View>
    ));
  };

  return (
    <Swiper loop={false} activeDotColor="#000">
      {renderPost()}
    </Swiper>
  );
};

export default SwipeView;
