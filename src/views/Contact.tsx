import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Linking,
} from 'react-native';
import contactContent from '../data/contactContent';
import { useAppTheme } from '../hooks/useAppTheme';

type Section = {
  type: 'paragraph' | 'link';
  text: string;
  url?: string;
};

const Contact = () => {
  const { styles } = useAppTheme(); // ✅ Simplified theming

  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case 'paragraph':
        return (
          <Text key={index} style={styles.sectionText}>
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
          </Text>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.titleHeadingContainer}>
        <Text style={styles.titleHeading}>
          <Text style={styles.titleBrand}>{contactContent.brand}</Text>
        </Text>
      </View>

      {(contactContent.sections as Section[]).map(renderSection)}
    </ScrollView>
  );
};

export default Contact;
