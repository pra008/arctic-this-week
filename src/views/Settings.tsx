import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import {
  Sun,
  Moon,
  Monitor,
  Type,
  Info,
  Shield,
  Mail,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Config from 'react-native-config';

import { useAppTheme } from '../hooks/useAppTheme';
import { CustomText } from '../components/CustomText';

import { setThemeMode } from '../reducers/themeReducer';
import { setTextSize } from '../reducers/textSizeReducer';
import { RootState } from '../store';
import { LinkItem } from '../components/settings/LinkItem';
import { RadioOption } from '../components/settings/RadioOption';
import { SettingsCard } from '../components/settings/SettingsCard';

export default function Settings() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const textSize = useSelector((state: RootState) => state.textSize.size);

  const setTheme = (mode: 'light' | 'dark' | 'system') =>
    dispatch(setThemeMode(mode));

  const handleTextSizeChange = (value: string) =>
    dispatch(setTextSize(value as 'small' | 'medium' | 'large'));

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System Default', icon: Monitor },
  ];

  const textSizeOptions = [
    { value: 'small', label: 'Small', preview: 'Aa', style: { fontSize: 14 } },
    { value: 'medium', label: 'Medium', preview: 'Aa', style: { fontSize: 16 } },
    { value: 'large', label: 'Large', preview: 'Aa', style: { fontSize: 22 } },
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
    `v.${Config.MAJOR_VERSION}.${Config.MINOR_VERSION}.${Config.PATCH_VERSION}`;

  return (
    <ScrollView style={styles.settingsContainer}>
      <View style={styles.settingsHeader}>
        <CustomText variant="title">Settings</CustomText>
        <CustomText variant="subtitle">Customize your app experience</CustomText>
      </View>

      <SettingsCard title="Appearance" icon={Sun}>
        {themeOptions.map((option) => (
          <RadioOption
            key={option.value}
            {...option}
            checked={themeMode === option.value}
            onChange={(value) => setTheme(value as any)}
          />
        ))}
      </SettingsCard>

      <SettingsCard title="Text Size" icon={Type}>
        {textSizeOptions.map((option) => (
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

      <SettingsCard title="Information" icon={Info}>
        {infoLinks.map((link, index) => (
          <View key={link.label}>
            <LinkItem {...link} />
            {index < infoLinks.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </SettingsCard>

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

    settingsHeader: {
      alignItems: 'center',
      marginBottom: 32,
      paddingTop: 20,
    } as ViewStyle,

    settingsFooter: {
      alignItems: 'center',
      paddingVertical: 32,
    } as ViewStyle,

    separator: {
      height: 1,
      backgroundColor: theme.colors.borderLight,
      marginHorizontal: 12,
    } as ViewStyle,
  });
