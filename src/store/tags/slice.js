import { fetchTags } from './actions'

const { createSlice } = require('@reduxjs/toolkit')

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload
    })
  },
})

export default tagsSlice
