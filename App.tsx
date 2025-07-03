// App.tsx
import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
} from 'react-native-paper';
import { Provider as ReduxProvider, useSelector } from 'react-redux';

import { store } from './src/store';
import { RootState } from './src/reducers';
import MainNavigator from './src/navigator/MainNavigator';


export default function App() {
  const scheme = useColorScheme();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const isDark = themeMode === 'dark' || (themeMode === 'system' && scheme === 'dark');
  const navTheme = isDark ? DarkTheme : DefaultTheme;
  const paperTheme = isDark ? PaperDarkTheme : PaperLightTheme;

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navTheme}>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
