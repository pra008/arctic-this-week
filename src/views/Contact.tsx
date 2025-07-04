import React, { useMemo } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';

import contactContent from '../data/contactContent';
import { useAppTheme } from '../hooks/useAppTheme';
import { CustomText } from '../components/CustomText';

const Contact = () => {
  const { theme, multiplier } = useAppTheme();
  const styles = useMemo(() => createStyles(theme, multiplier), [theme, multiplier]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Hero */}
      <View style={styles.hero}>
        <Image source={require('../images/logo.png')} style={styles.logo} resizeMode="contain" />
        <CustomText variant="heading" style={styles.brand}>{contactContent.brand}</CustomText>
      </View>

      {/* Contact Cards */}
      {contactContent.sections.map((section, index) => {
        const IconComponent = LucideIcons[pascalCase(section.icon ?? '')];
        const iconColor = theme.colors.text;

        return (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => section.url && Linking.openURL(section.url)}
            activeOpacity={0.8}
          >
            <View style={styles.iconWrapper}>
              {IconComponent && <IconComponent size={20} color={iconColor} />}
            </View>
            <View style={styles.cardContent}>
              <CustomText variant="subheading" style={styles.cardTitle}>{section.label}</CustomText>
              {section.lines.map((line, idx) => (
                <CustomText key={idx} variant="paragraph" style={styles.cardText}>{line}</CustomText>
              ))}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Contact;

const pascalCase = (str: string): string =>
  str
    .split(/[-_\s]/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
    hero: {
      alignItems: 'center',
      marginBottom: 30,
    },
    logo: {
      width: 72 * multiplier,
      height: 72 * multiplier,
      borderRadius: 36,
      marginBottom: 12,
    },
    brand: {
      color: theme.colors.text,
      marginTop: 8,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    iconWrapper: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      color: theme.colors.text,
      fontWeight: '600',
      marginBottom: 4,
    },
    cardText: {
      color: theme.colors.subText,
    },
  });
