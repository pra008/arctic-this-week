import React, {useMemo} from 'react';
import {View, ScrollView, StyleSheet, Switch, ViewStyle} from 'react-native';
import {Sun, Type, Info, Shield, Mail} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {MAJOR_VERSION, MINOR_VERSION, PATCH_VERSION} from '@env';

import {useAppTheme} from '../hooks/useAppTheme';
import {CustomText} from '../components/CustomText';

import {setThemeMode} from '../reducers/themeReducer';
import {setTextSize} from '../reducers/textSizeReducer';
import {RootState} from '../store';
import {LinkItem} from '../components/settings/LinkItem';
import {RadioOption} from '../components/settings/RadioOption';
import {SettingsCard} from '../components/settings/SettingsCard';

export default function Settings() {
  const navigation = useNavigation() as any;
  const dispatch = useDispatch();
  const {theme} = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const textSize = useSelector((state: RootState) => state.textSize.size);
  const isDarkMode = themeMode === 'dark';

  const toggleTheme = (value: boolean) => {
    dispatch(setThemeMode(value ? 'dark' : 'light'));
  };

  const handleTextSizeChange = (value: string) =>
    dispatch(setTextSize(value as 'small' | 'medium' | 'large'));

  const textSizeOptions = [
    {
      value: 'small',
      label: 'Small',
      preview: 'Aa',
      style: {fontSize: 14, color: theme.colors.text},
    },
    {
      value: 'medium',
      label: 'Medium',
      preview: 'Aa',
      style: {fontSize: 16, color: theme.colors.text},
    },
    {
      value: 'large',
      label: 'Large',
      preview: 'Aa',
      style: {fontSize: 22, color: theme.colors.text},
    },
  ];

  const infoLinks = [
    {
      label: 'About The Arctic Institute',
      icon: Info,
      onClick: () => navigation.navigate('About'),
    },
    {
      label: 'Privacy Policy',
      icon: Shield,
      onClick: () => navigation.navigate('Privacy'),
    },
    {
      label: 'Contact',
      icon: Mail,
      onClick: () => navigation.navigate('Contact'),
    },
  ];

  const getAppVersionName = () =>
    `v.${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_VERSION}`;

  return (
    <ScrollView style={styles.settingsContainer}>
      {/* Information section first */}
      <SettingsCard title="Information" icon={Info}>
        {infoLinks.map((link, index) => (
          <View key={link.label}>
            <LinkItem {...link} />
            {index < infoLinks.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </SettingsCard>

      {/* Dark Mode Switch */}
      <View style={styles.toggleRow}>
        <View style={styles.toggleLeft}>
          <Sun size={18} color={theme.colors.text} />
          <CustomText style={styles.toggleLabel}>Dark Mode</CustomText>
        </View>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      {/* Text Size options */}
      <SettingsCard title="Text Size" icon={Type}>
        {textSizeOptions.map(option => (
          <RadioOption
            key={option.value}
            value={option.value}
            label={option.label}
            checked={textSize === option.value}
            onChange={handleTextSizeChange}
            preview={option.preview}
            previewStyle={option.style}
          />
        ))}
      </SettingsCard>

      {/* Footer */}
      <View style={styles.settingsFooter}>
        <CustomText variant="footer">{getAppVersionName()}</CustomText>
      </View>
    </ScrollView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    settingsContainer: {
      flex: 1,
      paddingVertical: 20,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background,
    } as ViewStyle,

    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      marginBottom: 24,
      borderRadius: 16,
      borderColor: theme.colors.border,
      borderWidth: 1,
      backgroundColor: theme.colors.card,
    } as ViewStyle,

    toggleLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,

    toggleLabel: {
      marginLeft: 8,
      fontSize: 16,
      color: theme.colors.text,
    },

    separator: {
      height: 1,
      backgroundColor: theme.colors.borderLight || theme.colors.border,
      marginHorizontal: 12,
    } as ViewStyle,

    settingsFooter: {
      alignItems: 'center',
      paddingVertical: 32,
    } as ViewStyle,
  });
