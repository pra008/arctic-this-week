import React, {useMemo} from 'react';
import {ScrollView, View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Target } from 'lucide-react-native';

import {useAppTheme} from '../hooks/useAppTheme';
import {CustomText} from '../components/CustomText';
import aboutContent from '../data/aboutContent';

const About = () => {
  const {theme, multiplier} = useAppTheme();
  const styles = useMemo(
    () => createStyles(theme, multiplier),
    [theme, multiplier],
  );

  const quoteSection = aboutContent.sections.find(s => s.type === 'quote');
  const textSections = aboutContent.sections.filter(
    s => s.type === 'paragraph',
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <CustomText variant="heading" style={styles.brand}>
          {aboutContent.brand}
        </CustomText>

        <View style={styles.estBadge}>
          <CustomText variant="small" style={styles.estText}>
            {aboutContent.established}
          </CustomText>
        </View>
      </View>

      {/* Vision Section */}
      {quoteSection && (
        <LinearGradient
          colors={['#1E81CE', '#155B96']}
          style={styles.visionCard}>
          <View style={styles.visionHeader}>
            <Target size={18} color="white" style={{ marginRight: 8 }} />
            <CustomText variant="subheading" style={styles.visionTitle}>
              {aboutContent.visionTitle}
            </CustomText>
          </View>
          <CustomText variant="quote" style={styles.visionQuote}>
            {quoteSection.text}
          </CustomText>
        </LinearGradient>
      )}

      {/* Paragraphs */}
      {textSections.map((section, index) => (
        <View key={index}>
          <CustomText variant="paragraph">{section.text}</CustomText>
        </View>
      ))}
    </ScrollView>
  );
};

export default About;
const createStyles = (theme: any, multiplier: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      padding: 20,
      paddingBottom: 40,
    },
    headingBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16, // Added horizontal padding (left + right)
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.link, // More visible in dark mode
      backgroundColor: theme.colors.surface, // Improves dark mode contrast
      marginTop: 20,
      borderRadius: 8,
    },
    headingIcon: {
      marginRight: 8,
    },
    headingText: {
      fontWeight: '600',
      color: theme.colors.text,
      flexShrink: 1,
    },
    paragraph: {
      marginTop: 12,
      color: theme.colors.text,
      lineHeight: 24 * multiplier,
    },
    link: {
      color: theme.colors.link,
      textDecorationLine: 'underline',
    },
    quoteBlock: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.link,
      paddingLeft: 12,
      marginTop: 20,
      paddingVertical: 8,
    },
    quoteText: {
      fontStyle: 'italic',
      color: theme.colors.subText,
    },
  });

