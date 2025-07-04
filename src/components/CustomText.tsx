import React from 'react';
import { Text, TextProps, TextStyle, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppTheme } from '../hooks/useAppTheme';
import { RootState } from '../reducers';
import { TextSize } from '../reducers/textSizeReducer';
import { Typography, Variant } from '../styles/Typography';

interface CustomTextProps extends TextProps {
  variant?: Variant;
  children: React.ReactNode;
}

// Multiplier map for scaling
const sizeMultiplierMap: Record<TextSize, number> = {
  small: 0.85,
  medium: 1,
  large: 1.25,
};

export const CustomText: React.FC<CustomTextProps> = ({
  variant = 'body',
  style,
  children,
  ...props
}) => {
  const textSize = useSelector((state: RootState) => state.textSize.size);
  const { theme } = useAppTheme();
  const multiplier = sizeMultiplierMap[textSize];

  const base = Typography[variant];
  const scaledStyle: TextStyle = {
    ...base,
    fontSize: (base.fontSize ?? 14) * multiplier,
    lineHeight: base.lineHeight ? base.lineHeight * multiplier : undefined,
    color: theme.colors[
      variant === 'subtitle' || variant === 'label' || variant === 'footer'
        ? 'subText'
        : 'text'
    ],
  };

  const externalStyle = StyleSheet.flatten(style || {});
  const { fontSize, lineHeight, ...cleanedExternal } = externalStyle;

  return (
    <Text style={[scaledStyle, cleanedExternal]} {...props}>
      {children}
    </Text>
  );
};
