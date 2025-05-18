// src/reducers/newsReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsPost } from '../types/NewsPost';


interface NewsState {
  items: NewsPost[];       // fetched news
  loading: boolean;        // for spinner/loading state
  error?: string | null;   // optional error field
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
    setNews(state, action: PayloadAction<NewsPost[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setNews, startLoading, setError } = newsSlice.actions;
export default newsSlice.reducer;
