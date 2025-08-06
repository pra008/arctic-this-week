import React, {useState, useCallback} from 'react';
import {ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const PodcastNavigator: React.FC = () => {
  const [webViewKey, setWebViewKey] = useState(0);
  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === 'dark',
  );

  useFocusEffect(
    useCallback(() => {
      setWebViewKey(prev => prev + 1); // Remount on focus
    }, []),
  );

  // This script adds a dark class to the body
  const injectedJS = `
    document.documentElement.style.background = '${isDarkMode ? '#000' : '#fff'}';
    true;
  `;

  return (
    <WebView
      key={webViewKey}
      source={{uri: 'https://soundcloud.com/arcticinstitute'}}
      injectedJavaScript={injectedJS}
      startInLoadingState
      renderLoading={() => <ActivityIndicator size="large" />}
      style={{flex: 1}}
    />
  );
};

export default PodcastNavigator;
