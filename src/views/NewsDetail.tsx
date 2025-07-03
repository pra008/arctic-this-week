// src/views/NewsDetail.tsx
import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Linking,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, Card, Chip, useTheme, Divider } from 'react-native-paper';

import { HomeStackParamList } from '../navigation/MainNavigator';
import { useAppTheme } from '../hooks/useAppTheme';

type NewsDetailRouteProp = RouteProp<HomeStackParamList, 'NewsDetail'>;

const NewsDetail = () => {
  const { params } = useRoute<NewsDetailRouteProp>();
  const { post } = params;
  const { styles, theme } = useAppTheme();

  return (
    <ScrollView style={{ padding: 16 }}>
      <Card mode="outlined">
        {post.imageUrl && (
          <Image
            source={{ uri: post.imageUrl }}
            style={{ width: '100%', height: 220 }}
            resizeMode="cover"
          />
        )}
        <Card.Content>
          <Text variant="titleLarge" style={{ marginBottom: 8 }}>
            {post.title}
          </Text>
          <Text variant="bodyMedium" style={{ fontStyle: 'italic', color: theme.colors.secondary }}>
            {post.category} • {new Date(post.created * 1000).toLocaleDateString()}
          </Text>

          <Divider style={{ marginVertical: 12 }} />

          {post.excerpt && (
            <Text variant="bodyLarge" style={{ marginBottom: 12 }}>
              {post.excerpt}
            </Text>
          )}

          <Text variant="bodyMedium" style={{ marginBottom: 12 }}>
            {post.content}
          </Text>

          {post.tags && post.tags.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {post.tags.map((tag, index) => (
                <Chip key={index} style={{ marginRight: 6 }}>
                  {tag}
                </Chip>
              ))}
            </View>
          )}

          {post.imageCredit && (
            <Text
              variant="labelSmall"
              style={{ marginTop: 16, color: theme.colors.outline }}
            >
              📸 {post.imageCredit}
            </Text>
          )}

          <Divider style={{ marginVertical: 12 }} />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default NewsDetail;
