// src/reducers/newsReducer.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NewsItem} from '../types/NewsItem.ts';

interface NewsState {
  items: NewsItem[]; // fetched news
  loading: boolean; // for spinner/loading state
  error?: string | null; // optional error field
}

const initialState: NewsState = {
  items: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setNews(state, action: PayloadAction<NewsItem[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {setNews, startLoading, setError} = newsSlice.actions;
export default newsSlice.reducer;
