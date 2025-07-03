import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';

import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import newsReducer from '../reducers/newsReducer';
import themeReducer from '../reducers/themeReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'],
  timeout: 10000,
};

const rootReducer = combineReducers({
  news: newsReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
