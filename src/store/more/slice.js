const { createSlice } = require("@reduxjs/toolkit")

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

export default moreSlice
