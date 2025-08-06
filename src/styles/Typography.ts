import {TextStyle} from 'react-native';

export type Variant =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'label'
  | 'footer'
  | 'heading'
  | 'brand'
  | 'paragraph'
  | 'quote'
  | 'small'
  | 'subheading'
  | 'caption';

export const Typography: Record<Variant, TextStyle> = {
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 24,
  },
  heading: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },
  brand: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
  },
  quote: {
    fontSize: 16,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  small: {
    fontSize: 11,
    lineHeight: 16,
  },
  subheading: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
  },
  caption: {
    fontSize: 11,
    lineHeight: 14,
    color: '#888',
  },
};
