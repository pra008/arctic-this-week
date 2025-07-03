
import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../styles/theme';
import { createStyles } from '../styles/createStyles';
import { RootState } from '../reducers';

export const useAppTheme = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const systemScheme = useColorScheme();
  const isDark = mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  return { theme, styles, isDark };
};
