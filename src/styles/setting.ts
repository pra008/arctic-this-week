// style.ts
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f7',
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },

  // Title and Subtitle now managed via CustomText

  // Card
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 2},
    borderColor: '#e5e5e7',
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f7',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginLeft: 12,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // Radio
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    minHeight: 56,
  },
  radioInputWrapper: {
    marginRight: 12,
  },
  radioCircleOuter: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#c7c7cc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleChecked: {
    borderColor: '#007aff',
    backgroundColor: '#007aff',
  },
  radioDot: {
    width: 8,
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  radioLabel: {
    color: '#1c1c1e',
    fontWeight: '500',
    fontSize: 16,
  },
  radioPreview: {
    color: '#8e8e93',
    fontWeight: '400',
  },

  // Link
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    minHeight: 56,
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  linkLabel: {
    color: '#1c1c1e',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 12,
  },
  linkIcon: {
    color: '#8e8e93',
  },
  chevronIcon: {
    color: '#c7c7cc',
  },
  separator: {
    height: 1,
    backgroundColor: '#f2f2f7',
    marginHorizontal: 12,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
});
