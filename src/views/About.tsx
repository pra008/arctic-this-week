import React, { useMemo } from 'react';
import { ScrollView, View, StyleSheet, ViewStyle } from 'react-native';
import aboutContent from '../data/aboutContent';
import { useAppTheme } from '../hooks/useAppTheme';
import { CustomText } from '../components/CustomText';

const About = () => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.contentContainer}
>

      <View style={styles.headingWrapper}>
        <CustomText variant="heading">
          <CustomText variant="brand">
            {aboutContent.brand}
          </CustomText>
        </CustomText>
      </View>

      {aboutContent.sections.map((section, index) => {
        if (section.type === 'paragraph') {
          return (
            <CustomText key={index} variant="paragraph">
              {section.text}
            </CustomText>
          );
        }
        if (section.type === 'quote') {
          return (
            <CustomText key={index} variant="quote">
              {section.text}
            </CustomText>
          );
        }
        return null;
      })}
    </ScrollView>
  );
};

export default About;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
      paddingTop: 20,
    } as ViewStyle,

    contentContainer: {
      paddingBottom: 40, // <-- important
    } as ViewStyle,

    headingWrapper: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: 20,
      marginBottom: 20,
    } as ViewStyle,
  });
