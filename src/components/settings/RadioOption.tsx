import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {CustomText} from '../CustomText';
import {useAppTheme} from '../../hooks/useAppTheme';

interface RadioOptionProps {
  value: string;
  label: string;
  icon?: React.ComponentType<any>;
  checked: boolean;
  onChange: (value: string) => void;
  preview?: string;
  previewStyle?: any;
}

export const RadioOption: React.FC<RadioOptionProps> = ({
  value,
  label,
  icon: Icon,
  checked,
  onChange,
  preview,
  previewStyle,
}) => {
  const {theme} = useAppTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => onChange(value)}>
      <View style={styles.radioInputWrapper}>
        <View style={[styles.circleOuter, checked && styles.circleChecked]}>
          {checked && <View style={styles.radioDot} />}
        </View>
      </View>
      <View style={styles.labelContainer}>
        {Icon && (
          <Icon
            size={18}
            style={{marginRight: 6, color: theme.colors.subText}}
          />
        )}
        <CustomText variant="label">{label}</CustomText>
      </View>
      {preview && (
        <Text style={[styles.radioPreview, previewStyle]}>{preview}</Text>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderRadius: 12,
      minHeight: 56,
    },
    radioInputWrapper: {
      marginRight: 12,
    },
    circleOuter: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleChecked: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    radioDot: {
      width: 8,
      height: 8,
      backgroundColor: '#fff',
      borderRadius: 4,
    },
    labelContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    preview: {
      color: theme.colors.subText,
      fontWeight: '400',
    },
  });
