import React, { useMemo } from 'react';
import { ScrollView, Linking, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import privacyContent from '../data/privacyContent';
import { useAppTheme } from '../hooks/useAppTheme';
import { CustomText } from '../components/CustomText';

type Section = {
  type: 'heading' | 'paragraph' | 'quote' | 'link';
  text: string;
  url?: string;
  suffix?: string;
};

const Privacy = () => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case 'heading':
        return (
          <CustomText key={index} variant="heading" style={styles.heading}>
            {section.text}
          </CustomText>
        );

      case 'paragraph':
        return (
          <CustomText key={index} variant="paragraph">
            {section.text}
          </CustomText>
        );

      case 'quote':
        return (
          <CustomText key={index} variant="quote">
            {section.text}
          </CustomText>
        );

      case 'link':
        return (
          <CustomText key={index} variant="paragraph">
            {section.text}{' '}
            <CustomText
              style={styles.link}
              onPress={() => section.url && Linking.openURL(section.url)}
            >
              {section.url}
            </CustomText>
            {section.suffix && <CustomText variant="paragraph">{section.suffix}</CustomText>}
          </CustomText>
        );

      default:
        return null;
    }
  };

  return <ScrollView
  style={styles.container}
  contentContainerStyle={{ paddingBottom: 40 }}
>
  {privacyContent.sections.map(renderSection)}
</ScrollView>

};

export default Privacy;


const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    } as ViewStyle,

    heading: {
      marginVertical: 15,
    } as TextStyle,

    link: {
      color: theme.colors.link,
      textDecorationLine: 'underline',
    } as TextStyle,
  });
