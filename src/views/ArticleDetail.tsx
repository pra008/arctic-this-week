import React, { useMemo } from 'react';
import {
  ScrollView,
  View,
  Image,
  Share,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  RouteProp,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import {
  Card,
  Chip,
  Divider,
  IconButton,
  useTheme,
} from 'react-native-paper';
import { ArrowLeft, Share2, Clock } from 'lucide-react-native';
import { HomeStackParamList } from '../navigator/MainNavigator';
import { CustomText } from '../components/CustomText';
import { useAppTheme } from '../hooks/useAppTheme';

type ArticleDetailRouteProp = RouteProp<HomeStackParamList, 'ArticleDetail'>;

const ArticleDetail = () => {
  const { params } = useRoute<ArticleDetailRouteProp>();
  const { post } = params;
  const navigation = useNavigation();
  const paperTheme = useTheme();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getReadingTime = (text: string) => {
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `${post.title}\n\n${post.excerpt ?? ''}`,
      });
    } catch (e) {
      console.warn('Share failed', e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon={ArrowLeft}
          onPress={() => navigation.goBack()}
          iconColor={theme.colors.text}
        />
        <IconButton
          icon={Share2}
          onPress={onShare}
          iconColor={theme.colors.text}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          {post.imageUrl && (
            <Image source={{ uri: post.imageUrl }} style={styles.image} />
          )}
          <Card.Content>
            <CustomText variant="title" style={styles.title}>
              {post.title}
            </CustomText>

            <View style={styles.metaRow}>
              <Chip
                style={styles.chip}
                textStyle={{ color: paperTheme.colors.primary }}
                compact
              >
                {post.category}
              </Chip>
              <CustomText variant="label" style={styles.metaText}>
                {formatDate(post.created)} • {getReadingTime(post.content)}
              </CustomText>
            </View>

            <Divider style={styles.divider} />

            {post.excerpt && (
              <CustomText variant="paragraph" style={styles.excerpt}>
                {post.excerpt}
              </CustomText>
            )}

            <CustomText variant="body" style={styles.body}>
              {post.content}
            </CustomText>

            {post.tags?.length > 0 && (
              <View style={styles.tagWrapper}>
                {post.tags.map((tag, idx) => (
                  <Chip
                    key={idx}
                    mode="outlined"
                    style={styles.tagChip}
                    textStyle={styles.tagText}
                  >
                    {tag}
                  </Chip>
                ))}
              </View>
            )}

            {post.imageCredit && (
              <CustomText variant="label" style={styles.imageCredit}>
                📸 {post.imageCredit}
              </CustomText>
            )}

            <Divider style={styles.divider} />

            <TouchableOpacity onPress={onShare} style={styles.shareButton}>
              <Share2 size={18} color={theme.colors.text} style={{ marginRight: 8 }} />
              <CustomText variant="label" style={{ fontWeight: '500' }}>
                Share Article
              </CustomText>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default ArticleDetail;


const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    } as ViewStyle,

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    } as ViewStyle,

    scrollContent: {
      paddingBottom: 16,
    } as ViewStyle,

    card: {
      marginHorizontal: 16,
      marginTop: 4,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: theme.colors.background,
    } as ViewStyle,

    image: {
      width: '100%',
      height: 220,
    } as ViewStyle,

    title: {
      marginTop: 12,
      marginBottom: 8,
    } as TextStyle,

    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 8,
    } as ViewStyle,

    chip: {
      backgroundColor: theme.colors.secondary,
      marginRight: 6,
    } as ViewStyle,

    metaText: {
      color: theme.colors.subText,
      fontSize: 13,
    } as TextStyle,

    divider: {
      backgroundColor: theme.colors.border,
      marginVertical: 12,
    } as ViewStyle,

    excerpt: {
      marginBottom: 16,
    } as TextStyle,

    body: {
      lineHeight: 22,
      fontSize: 14,
      marginBottom: 16,
    } as TextStyle,

    tagWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 16,
    } as ViewStyle,

    tagChip: {
      borderColor: theme.colors.border,
      marginRight: 6,
      backgroundColor: theme.colors.background,
    } as ViewStyle,

    tagText: {
      color: theme.colors.text,
      fontSize: 12,
    } as TextStyle,

    imageCredit: {
      marginTop: 12,
      borderTopWidth: 1,
      borderColor: theme.colors.border,
      paddingTop: 8,
      color: theme.colors.subText,
      fontSize: 12,
    } as TextStyle,

    shareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
    } as ViewStyle,
  });

