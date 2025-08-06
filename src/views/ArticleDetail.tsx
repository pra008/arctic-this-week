import React, {useMemo, useRef} from 'react';
import {
  Animated,
  ScrollView,
  View,
  Image,
  Share,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Chip, Divider, useTheme} from 'react-native-paper';
import {Share2, Clock} from 'lucide-react-native';
import {HomeStackParamList} from '../navigator/MainNavigator';
import {CustomText} from '../components/CustomText';
import {useAppTheme} from '../hooks/useAppTheme';

type ArticleDetailRouteProp = RouteProp<HomeStackParamList, 'ArticleDetail'>;

const {width: screenWidth} = Dimensions.get('window');

const ArticleDetail = () => {
  const {params} = useRoute<ArticleDetailRouteProp>();
  const {post} = params;
  const paperTheme = useTheme();
  const {theme} = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const progressBarWidth = useRef(new Animated.Value(0)).current;

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    const progress =
      contentOffset.y / (contentSize.height - layoutMeasurement.height);
    progressBarWidth.setValue(progress * screenWidth);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
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
      {/* Progress Bar */}
      <Animated.View style={[styles.progressBar, {width: progressBarWidth}]} />

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        <Image source={{uri: post.imageUrl}} style={styles.image} />

        <View style={styles.contentWrapper}>
          <CustomText variant="title" style={styles.title}>
            {post.title}
          </CustomText>

          <View style={styles.metaRow}>
            <Chip
              style={styles.chip}
              textStyle={{color: paperTheme.colors.primary}}
              compact>
              {post.category}
            </Chip>

            <View style={styles.metaTextRow}>
              <Clock size={14} color={theme.colors.subText} />
              <CustomText variant="label" style={styles.metaText}>
                {formatDate(post.created)}
              </CustomText>
            </View>
          </View>

          {post.excerpt && (
            <CustomText variant="paragraph" style={styles.excerpt}>
              {post.excerpt}
            </CustomText>
          )}

          <Divider style={styles.divider} />

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
                  textStyle={styles.tagText}>
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
        </View>
      </Animated.ScrollView>

      {/* Floating Share Button */}
      <TouchableOpacity style={styles.fab} onPress={onShare}>
        <Share2 size={20} color="#fff" />
      </TouchableOpacity>
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

    progressBar: {
      height: 3,
      backgroundColor: theme.colors.primary,
    } as ViewStyle,

    scrollContent: {
      paddingBottom: 80,
    } as ViewStyle,

    image: {
      width: '100%',
      height: 220,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    } as ViewStyle,

    contentWrapper: {
      paddingHorizontal: 16,
      paddingTop: 16,
    } as ViewStyle,

    title: {
      marginBottom: 8,
    } as TextStyle,

    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginBottom: 12,
    } as ViewStyle,

    metaTextRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    } as ViewStyle,

    chip: {
      backgroundColor: theme.colors.secondary,
    } as ViewStyle,

    metaText: {
      color: theme.colors.subText,
      fontSize: 13,
      marginLeft: 4,
    } as TextStyle,

    divider: {
      backgroundColor: theme.colors.border,
      marginVertical: 16,
    } as ViewStyle,

    excerpt: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.colors.text,
      marginBottom: 16,
    } as TextStyle,

    body: {
      fontSize: 15,
      lineHeight: 24,
      color: theme.colors.text,
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
      backgroundColor: theme.colors.background,
      marginRight: 6,
    } as ViewStyle,

    tagText: {
      color: theme.colors.text,
      fontSize: 12,
    } as TextStyle,

    imageCredit: {
      fontSize: 11,
      fontStyle: 'italic',
      color: theme.colors.subText,
      textAlign: 'center',
      marginBottom: 16,
    } as TextStyle,

    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 28,
      elevation: 4,
    } as ViewStyle,
  });
