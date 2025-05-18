// src/reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit'; // use RTK's version
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
  news: newsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
