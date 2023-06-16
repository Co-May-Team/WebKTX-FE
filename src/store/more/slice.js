import { createSlice } from "@reduxjs/toolkit/dist"

const moreSlice = createSlice({
  name: "more",
  initialState: {
    searchTerm: "",
    isDarkMode: false,
  },
  reducers: {
    toggleDarkMode: (state, action) => {
      state.isDarkMode = !state.isDarkMode
    },
    searchPost: (state, action) => {
      state.searchTerm = action.payload
    },
  },
})

export const { searchPost, toggleDarkMode } = moreSlice.actions

export default moreSlice
