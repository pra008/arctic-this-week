const common = {
  fontSize: {
    heading: 36,
    subheading: 24,
    body: 16,
    quote: 24,
    caption: 14,
  },
  fontFamily: {
    heading: Platform.select({ ios: 'System', android: 'Roboto' }),
    body: Platform.select({ ios: 'System', android: 'Roboto' }),
    quote: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
};

export const lightTheme = {
  ...common,
  colors: {
    background: '#f3f3f3',
    surface: '#fff',
    text: '#1c1c1e',
    subText: '#353535',
    link: '#007BFF',
    border: '#e2e2e2',
  },
};

export const darkTheme = {
  ...common,
  colors: {
    background: '#1c1c1e',
    surface: '#2c2c2e', 
    text: '#f3f3f3',
    subText: '#c7c7cc',
    link: '#0a84ff',
    border: '#3a3a3c',
  },
};

