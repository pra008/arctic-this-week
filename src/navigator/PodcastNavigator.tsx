import React, { useEffect } from 'react';
import { Linking, View, ActivityIndicator } from 'react-native';

const PodcastNavigator: React.FC = () => {
  useEffect(() => {
    Linking.openURL('https://soundcloud.com/arcticinstitute');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );
};

export default PodcastNavigator;
