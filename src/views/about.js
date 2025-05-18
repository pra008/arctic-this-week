import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import aboutContent from '../data/aboutContent'; // Import the content from the separate file

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#f3f3f3',
    marginTop: 0,
    height,
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
  mainContent: {
    marginTop: 25,
    marginBottom: 35,
    fontSize: 16,
    fontFamily: 'calendas_plus',
    color: '#353535',
  },
  quote: {
    fontSize: 24,
    fontFamily: 'knile-semibold',
    color: '#1c1c1e',
    fontStyle: 'italic',
  },
});

const {
  mainView,
  titleHeadingContainer,
  titleHeading,
  titleBrand,
  mainContent,
  quote,
} = styles;

const About = () => {
  return (
    <ScrollView style={mainView}>
      
       <View style={{ margin: 25 }}>
       
        <View style={titleHeadingContainer}>
          <Text style={titleHeading}>
            {/* {aboutContent.title} */}
            <Text style={titleBrand}> {aboutContent.brand}</Text>
          </Text>
        </View> 
        

        {/* Dynamic Sections */}
        {aboutContent.sections.map((section, index) => {
          if (section.type === "paragraph") {
            return (
              <Text key={index} style={mainContent}>
                {section.text}
              </Text>
            );
          }

          if (section.type === "quote") {
            return (
              <Text key={index} style={quote}>
                {section.text}
              </Text>
            );
          }

          return null;
        })}
      </View>
    </ScrollView>
  );
};

export default About;
