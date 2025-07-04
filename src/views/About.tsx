import React, { useMemo } from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Target } from 'lucide-react-native';

import { useAppTheme } from '../hooks/useAppTheme';
import { CustomText } from '../components/CustomText';
import aboutContent from '../data/aboutContent';

const About = () => {
  const { theme, multiplier } = useAppTheme();
  const styles = useMemo(() => createStyles(theme, multiplier), [theme, multiplier]);

  const quoteSection = aboutContent.sections.find(s => s.type === 'quote');
  const textSections = aboutContent.sections.filter(s => s.type === 'paragraph');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
          style={styles.visionCard}
        >
          <View style={styles.visionHeader}>
            <Target size={18} color="white" style={styles.visionIcon} />
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
        <CustomText key={index} variant="paragraph" style={styles.paragraph}>
          {section.text}
        </CustomText>
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
    hero: {
      alignItems: 'center',
      marginBottom: 30,
    },
    logo: {
      width: 72 * multiplier,
      height: 72 * multiplier,
      borderRadius: 36,
    },
    brand: {
      color: theme.colors.text,
      marginTop: 8,
    },
    estBadge: {
      backgroundColor: '#CFE6FB',
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 4,
      marginVertical: 6,
    },
    estText: {
      color: '#1E81CE',
    },
    subtitle: {
      color: theme.colors.subText,
      textAlign: 'center',
      marginTop: 4,
    },
    visionCard: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    },
    visionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    visionIcon: {
      marginRight: 8,
    },
    visionTitle: {
      color: 'white',
      fontWeight: 'bold',
    },
    visionQuote: {
      color: 'white',
      fontStyle: 'italic',
      lineHeight: 24 * multiplier,
    },
    paragraph: {
      marginBottom: 16,
      color: theme.colors.text,
      lineHeight: 24 * multiplier,
    },
  });
