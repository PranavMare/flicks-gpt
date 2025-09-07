import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearch: false,
    gptMovies: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGPTMovieResult: (state, action) => {
      state.gptMovies = action.payload;
    },
  },
});

export const { toggleGptSearchView, addGPTMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
