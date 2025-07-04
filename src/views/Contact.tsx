import React, { useMemo } from 'react';
import { ScrollView, View, Linking, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import contactContent from '../data/contactContent';
import { useAppTheme } from '../hooks/useAppTheme';
import { CustomText } from '../components/CustomText';

type Section = {
  type: 'paragraph' | 'link';
  text: string;
  url?: string;
};

const Contact = () => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case 'paragraph':
        return (
          <CustomText key={index} variant="paragraph">
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
          </CustomText>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingWrapper}>
        <CustomText variant="heading">
          <CustomText variant="brand">{contactContent.brand}</CustomText>
        </CustomText>
      </View>

      {(contactContent.sections as Section[]).map(renderSection)}
    </ScrollView>
  );
};

export default Contact;


const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    } as ViewStyle,

    headingWrapper: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: 20,
      marginBottom: 20,
    } as ViewStyle,

    link: {
      color: theme.colors.link,
      textDecorationLine: 'underline',
    } as TextStyle,
  });
