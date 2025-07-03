// createStyles.js
import { StyleSheet } from 'react-native';

export const createStyles = (theme) =>
  StyleSheet.create({
    // === Shared container for most screens (About, Contact, Privacy, etc.)
    mainView: {
      backgroundColor: theme.colors.background,
      padding: 20,
      flex: 1,
    },

    // === Title Header block used in About, Contact, Privacy screens
    titleHeadingContainer: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: 20,
    },

    // === Main heading text style (used in titleHeading)
    titleHeading: {
      fontSize: theme.fontSize.heading,
      fontFamily: theme.fontFamily.heading,
      color: theme.colors.text,
    },

    // === Subheading within a heading (brand name)
    titleBrand: {
      fontSize: theme.fontSize.subheading,
      color: theme.colors.text,
    },

    // === Regular paragraph body text (used in all content screens)
    sectionText: {
      fontSize: theme.fontSize.body,
      color: theme.colors.subText,
      lineHeight: 24,
      marginBottom: 15,
    },

    // === Hyperlink style (for link-type content in Contact/Privacy)
    sectionLink: {
      fontSize: theme.fontSize.body,
      color: theme.colors.link,
      textDecorationLine: 'underline',
      marginBottom: 15,
    },

    // === Headings inside rich content (Privacy screen, for example)
    sectionHeading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginVertical: 15,
    },

    // === Quotes and emphasized text (used in Privacy/About)
    sectionQuote: {
      fontSize: 18,
      fontStyle: 'italic',
      color: theme.colors.text,
      marginVertical: 15,
    },

    // === Used in Home.tsx for wrapping ScrollView
    container: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 54,
      backgroundColor: theme.colors.background,
    },

    // === Used in ScrollView contentContainerStyle
    content: {
      paddingBottom: 30,
    },

    // === Each news block wrapper (Home.tsx fallback layout)
    newsBlock: {
      marginBottom: 20,
    },

    // === Label text before values (e.g., ID, Category in Home.tsx)
    label: {
      fontWeight: 'bold',
      color: theme.colors.text,
      marginTop: 5,
    },

    // === Displayed if no news is available (Home.tsx)
    message: {
      textAlign: 'center',
      marginTop: 30,
      fontSize: theme.fontSize.body,
      color: theme.colors.text,
    },

    // === Divider between blocks (used in Home.tsx news fallback)
    separator: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: 10,
    },

    // === Optional: Style for Card containers (used in Home card layout)
    card: {
      marginBottom: 16,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: theme.colors.background,
    },
  });
