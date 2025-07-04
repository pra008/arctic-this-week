import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TextSize = 'small' | 'medium' | 'large';

interface TextSizeState {
  size: TextSize;
}

const initialState: TextSizeState = {
  size: 'medium',
};

const textSizeSlice = createSlice({
  name: 'textSize',
  initialState,
  reducers: {
    setTextSize(state, action: PayloadAction<TextSize>) {
      state.size = action.payload;
    },
  },
});

export const { setTextSize } = textSizeSlice.actions;
export default textSizeSlice.reducer;
