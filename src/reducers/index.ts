import {combineReducers} from '@reduxjs/toolkit';
import newsReducer from './newsReducer';
import themeReducer from './themeReducer';
import textSizeReducer from './textSizeReducer';

const rootReducer = combineReducers({
  news: newsReducer,
  theme: themeReducer,
  textSize: textSizeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
