import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';
import {useTheme, RadioButton, Text, Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setThemeMode, ThemeMode} from '../reducers/themeReducer';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';
import {RootState} from '../reducers';

type MenuItem = {
  label: string;
  screen: string;
  icon: any;
};

const menuItems: MenuItem[] = [
  {
    label: 'The Arctic This Week',
    screen: 'AllNews',
    icon: require('../images/logo.png'),
  },
  {
    label: 'About The Arctic Institute',
    screen: 'About',
    icon: require('../images/about.png'),
  },
  {
    label: 'Contact',
    screen: 'Contact',
    icon: require('../images/message.png'),
  },
  {
    label: 'Privacy Policy',
    screen: 'Privacy',
    icon: require('../images/privacy.png'),
  },
];

export default function SideMenu({navigation}: DrawerContentComponentProps) {
  const dispatch = useDispatch();
  const systemScheme = useColorScheme();
  const paperTheme = useTheme();
  const currentMode = useSelector((state: RootState) => state.theme.mode);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: paperTheme.colors.background},
      ]}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.screen)}>
          <View
            style={[
              styles.menuItemContainer,
              {borderColor: paperTheme.colors.outline},
            ]}>
            <Image style={styles.menuIcon} source={item.icon} />
            <Text
              style={[
                styles.menuItem,
                {color: paperTheme.colors.onBackground},
              ]}>
              {item.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <Divider style={{marginVertical: 16, marginHorizontal: 20}} />

      <View style={styles.themeSection}>
        <Text
          style={[
            styles.sectionTitle,
            {color: paperTheme.colors.onBackground},
          ]}>
          Theme
        </Text>

        <RadioButton.Group
          onValueChange={(value: string) =>
            dispatch(setThemeMode(value as ThemeMode))
          }
          value={currentMode}>
          {['light', 'dark', 'system'].map(mode => (
            <RadioButton.Item
              key={mode}
              label={
                mode === 'system'
                  ? 'System Default'
                  : mode.charAt(0).toUpperCase() + mode.slice(1)
              }
              value={mode}
              mode="android" // Looks better across platforms
              labelStyle={{fontSize: 14, fontFamily: 'knile-semibold'}}
              position="leading"
            />
          ))}
        </RadioButton.Group>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  menuItemContainer: {
    marginLeft: 20,
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'knile-semibold',
  },
  menuIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  themeSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'knile-semibold',
    marginBottom: 6,
  },
});
