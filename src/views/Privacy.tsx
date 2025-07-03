import React from 'react';
import {
  ScrollView,
  Text,
  Linking,
} from 'react-native';
import privacyContent from '../data/privacyContent';
import { useAppTheme } from '../hooks/useAppTheme';

type Section = {
  type: 'heading' | 'paragraph' | 'quote' | 'link';
  text: string;
  url?: string;
  suffix?: string;
};

const Privacy = () => {
  const { styles } = useAppTheme(); // ✅ replaces useSelector + useColorScheme

  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case 'heading':
        return (
          <Text key={index} style={styles.sectionHeading}>
            {section.text}
          </Text>
        );

      case 'paragraph':
        return (
          <Text key={index} style={styles.sectionText}>
            {section.text}
          </Text>
        );

      case 'quote':
        return (
          <Text key={index} style={styles.sectionQuote}>
            {section.text}
          </Text>
        );

      case 'link':
        return (
          <Text key={index} style={styles.sectionText}>
            {section.text}{' '}
            <Text
              style={styles.sectionLink}
              onPress={() => section.url && Linking.openURL(section.url)}
            >
              {section.url}
            </Text>
            {section.suffix && <Text>{section.suffix}</Text>}
          </Text>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.mainView}>
      {(privacyContent.sections as Section[]).map(renderSection)}
    </ScrollView>
  );
};

export default Privacy;
