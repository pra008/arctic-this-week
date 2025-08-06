import React, {useMemo} from 'react';
import {ScrollView, View, Linking, StyleSheet} from 'react-native';
import * as LucideIcons from 'lucide-react-native'; // import all icons by name

import {useAppTheme} from '../hooks/useAppTheme';
import {CustomText} from '../components/CustomText';
import privacyContent from '../data/privacyContent';

const Privacy = () => {
  const {theme, multiplier} = useAppTheme();
  const styles = useMemo(
    () => createStyles(theme, multiplier),
    [theme, multiplier],
  );

  const renderSection = (section: any, index: number) => {
    const IconComponent = section.icon
      ? LucideIcons[camelCase(section.icon)]
      : null;

    switch (section.type) {
      case 'heading':
        return (
          <View key={index} style={styles.headingBlock}>
            {IconComponent && (
              <IconComponent
                size={18}
                color={theme.colors.text}
                style={styles.headingIcon}
              />
            )}
            <CustomText variant="heading" style={styles.headingText}>
              {section.text}
            </CustomText>
          </View>
        );

      case 'paragraph':
        return (
          <CustomText key={index} variant="paragraph" style={styles.paragraph}>
            {section.text}
          </CustomText>
        );

      case 'quote':
        return (
          <View key={index} style={styles.quoteBlock}>
            <CustomText variant="quote" style={styles.quoteText}>
              {section.text}
            </CustomText>
          </View>
        );

      case 'link':
        return (
          <CustomText key={index} variant="paragraph" style={styles.paragraph}>
            {section.text}{' '}
            <CustomText
              style={styles.link}
              onPress={() => section.url && Linking.openURL(section.url)}>
              {section.url}
            </CustomText>
            {section.suffix && (
              <CustomText variant="paragraph" style={styles.paragraph}>
                {section.suffix}
              </CustomText>
            )}
          </CustomText>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {privacyContent.sections.map(renderSection)}
    </ScrollView>
  );
};

export default Privacy;

// Utility: convert kebab-case to PascalCase for Lucide (e.g. "file-text" → "FileText")
const camelCase = (name: string) =>
  name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

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
