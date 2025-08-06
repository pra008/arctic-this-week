// hooks/useAppTheme.ts
import {useSelector} from 'react-redux';
import {useColorScheme} from 'react-native';
import {lightTheme, darkTheme} from '../styles/theme';
import {createStyles} from '../styles/sharedStyles';
import {RootState} from '../reducers';
import {TextSize} from '../reducers/textSizeReducer';

const sizeMultiplierMap: Record<TextSize, number> = {
  small: 0.85,
  medium: 1,
  large: 1.25,
};

export const useAppTheme = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const textSize = useSelector((state: RootState) => state.textSize.size);

  const systemScheme = useColorScheme();
  const isDark =
    mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  const theme = isDark ? darkTheme : lightTheme;

  const multiplier = sizeMultiplierMap[textSize];
  const styles = createStyles(theme);

  return {
    theme,
    styles,
    isDark,
    textSize,
    multiplier,
  };
};
