import { combineReducers } from '@reduxjs/toolkit';
import newsReducer from './newsReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  news: newsReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
