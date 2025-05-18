// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // <– bring in combined reducers

export const store = configureStore({
  reducer: rootReducer, // <– now it's scalable for more slices
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
