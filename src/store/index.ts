import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import newsReducer from '../reducers/newsReducer';
import themeReducer from '../reducers/themeReducer';
import textSizeReducer from '../reducers/textSizeReducer';

const persistConfig = {
  key: 'root', // Key for the persisted state
  storage: AsyncStorage, // Use AsyncStorage for persistence
  whitelist: ['theme', 'textSize'], // Only persist theme and textSize reducers
  timeout: 10000, // Optional: timeout for persistence operations
};

const rootReducer = combineReducers({
  news: newsReducer,
  theme: themeReducer,
  textSize: textSizeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
