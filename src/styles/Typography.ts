import { TextStyle } from "react-native";

export type Variant =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'label'
  | 'footer'
  | 'heading'
  | 'brand'
  | 'paragraph'
  | 'small'
  | 'subheading'
  | 'caption'
  | 'quote';

export const Typography: Record<Variant, TextStyle> = {
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 32,
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  brand: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
  },
  quote: {
    fontSize: 18,
    lineHeight: 26,
    fontStyle: 'italic',
  },
  small: {
    fontSize: 12,
    lineHeight: 18,
  },
  subheading: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    color: '#888',
  },

};
