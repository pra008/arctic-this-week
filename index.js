// index.js or index.tsx
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store'; // ← NEW
import App from './App';
import { name as appName } from './app.json';

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Main);
