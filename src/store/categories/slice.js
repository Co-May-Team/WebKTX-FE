import { fetchCategories } from './actions'

const { createSlice } = require('@reduxjs/toolkit')

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
  },
})

export default categoriesSlice
