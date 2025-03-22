import { createSlice } from '@reduxjs/toolkit'

export const wordSlice = createSlice({
  name: "word",
  initialState: {
    words: [],
    loading: false,
    error: null,
    gameState: 'init',
    currentWordIndex: 0
  },
  reducers: {
    setWords: (state, action) => {
      state.words = action.payload;
    },
    updateWordStatus: (state, action) => {
      const { index, isCorrect,isSkipped } = action.payload;
      state.words[index] = { ...state.words[index], isCorrect,isSkipped };
    },
    increment: (state) => {
      state.currentWordIndex = state.currentWordIndex + 1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetGame: (state) => {
      state.currentWordIndex = 0;
      state.gameState = 'init';
    }
  },
});

export const { setWords, updateWordStatus , increment, setLoading, setError, resetGame } = wordSlice.actions;
export default wordSlice.reducer;
