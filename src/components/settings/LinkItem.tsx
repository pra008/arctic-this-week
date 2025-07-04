import React, { useMemo } from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { CustomText } from '../../components/CustomText';
import { useAppTheme } from '../../hooks/useAppTheme';

interface LinkItemProps {
  label: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
}

export const LinkItem: React.FC<LinkItemProps> = ({ label, icon: Icon, onClick }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity style={styles.linkItem} onPress={onClick}>
      <View style={styles.linkContent}>
        <Icon size={18} style={styles.linkIcon} />
        <CustomText variant="label" style={styles.linkLabel}>
          {label}
        </CustomText>
      </View>
      <ChevronRight size={18} style={styles.chevronIcon} />
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    linkItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderRadius: 12,
      minHeight: 56,
    } as ViewStyle,

    linkContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    } as ViewStyle,

    linkLabel: {
      marginLeft: 12, // No fontSize here — handled by `CustomText` variant
    } as TextStyle,

    linkIcon: {
      color: theme.colors.subText,
    } as TextStyle,

    chevronIcon: {
      color: theme.colors.border,
    } as TextStyle,
  });
