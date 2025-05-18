import React from 'react';
import { ScrollView, View, Text, StyleSheet, Linking } from 'react-native';
import contactContent from '../data/contactContent';

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#f3f3f3',
    marginTop: 0,
    padding: 20,
  },
  titleHeadingContainer: {
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleHeading: {
    fontSize: 36,
    fontFamily: 'knile-semibold',
    color: '#1c1c1e',
  },
  titleBrand: {
    color: '#000000',
    fontSize: 24,
  },
  sectionText: {
    fontSize: 16,
    color: '#353535',
    lineHeight: 24,
    marginBottom: 15,
  },
  sectionLink: {
    fontSize: 16,
    color: '#007BFF', // Blue for links
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
});

const Contact = () => {
  const renderSection = (section, index) => {
    switch (section.type) {
      case "paragraph":
        return (
          <Text key={index} style={styles.sectionText}>
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
          </Text>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.mainView}>
      {/* Title */}
      <View style={styles.titleHeadingContainer}>
        <Text style={styles.titleHeading}>
          {/* {contactContent.title} */}
          <Text style={styles.titleBrand}> {contactContent.brand}</Text>
        </Text>
      </View>

      {/* Render Sections */}
      {contactContent.sections.map((section, index) => renderSection(section, index))}
    </ScrollView>
  );
};

export default Contact;
