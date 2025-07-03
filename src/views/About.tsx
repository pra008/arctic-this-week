import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import aboutContent from '../data/aboutContent';
import { useAppTheme } from '../hooks/useAppTheme';

type Section = {
  type: 'paragraph' | 'quote';
  text: string;
};

const About = () => {
  const { styles } = useAppTheme(); // 

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.titleHeadingContainer}>
        <Text style={styles.titleHeading}>
          <Text style={styles.titleBrand}>{aboutContent.brand}</Text>
        </Text>
      </View>

      {(aboutContent.sections as Section[]).map((section, index) => {
        if (section.type === 'paragraph') {
          return (
            <Text key={index} style={styles.sectionText}>
              {section.text}
            </Text>
          );
        }
        if (section.type === 'quote') {
          return (
            <Text key={index} style={styles.sectionQuote}>
              {section.text}
            </Text>
          );
        }
        return null;
      })}
    </ScrollView>
  );
};

export default About;
