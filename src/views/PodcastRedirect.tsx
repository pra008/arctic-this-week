// src/views/PodcastRedirect.tsx
import { useEffect } from 'react';
import { Linking } from 'react-native';

const PodcastRedirect = () => {
  useEffect(() => {
    Linking.openURL('https://soundcloud.com/arcticinstitute');
  }, []);

  return null;
};

export default PodcastRedirect;
