import React from 'react';
import { ScrollView, View, Text, StyleSheet, Linking } from 'react-native';
import privacyContent from '../data/privacyContent';

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#f3f3f3',
    marginTop: 0,
    padding: 20,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 10,
    marginTop: 20,
  },
  sectionText: {
    fontSize: 16,
    color: '#353535',
    lineHeight: 24,
    marginBottom: 15,
  },
  sectionQuote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#1c1c1e',
    marginTop: 15,
    marginBottom: 15,
  },
  sectionLink: {
    fontSize: 16,
    color: '#007BFF', // Blue for links
    textDecorationLine: 'underline',
  },
});

const Privacy = () => {
  const renderContent = (section, index) => {
    switch (section.type) {
      case "heading":
        return (
          <Text key={index} style={styles.sectionHeading}>
            {section.text}
          </Text>
        );

      case "paragraph":
        return (
          <Text key={index} style={styles.sectionText}>
            {section.text}
          </Text>
        );

      case "quote":
        return (
          <Text key={index} style={styles.sectionQuote}>
            {section.text}
          </Text>
        );

      case "link":
        return (
          <Text key={index} style={styles.sectionText}>
            {section.text}
            <Text
              style={styles.sectionLink}
              onPress={() => Linking.openURL(section.url)}
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
      {/* Title */}
      {/* <Text style={styles.sectionHeading}>{privacyContent.title}</Text> */}

      {/* Render all sections dynamically */}
      {privacyContent.sections.map((section, index) => renderContent(section, index))}
    </ScrollView>
  );
};

export default Privacy;
