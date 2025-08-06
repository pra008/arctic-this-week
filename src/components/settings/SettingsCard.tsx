import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useAppTheme} from '../../hooks/useAppTheme';
import {CustomText} from '../CustomText';

interface SettingsCardProps {
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  icon: Icon,
  children,
}) => {
  const {theme} = useAppTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon size={20} color={theme.colors.text} />
        <CustomText variant="subtitle" style={styles.cardTitle}>
          {title}
        </CustomText>
      </View>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 16,
      shadowOffset: {width: 0, height: 2},
      borderColor: theme.colors.border,
      borderWidth: 1,
      overflow: 'hidden',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    },
    cardTitle: {
      marginLeft: 12, //  No fontSize override
    },
    cardContent: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
  });
