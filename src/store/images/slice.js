import { fetchImages } from './actions'

const { createSlice } = require('@reduxjs/toolkit')

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.images = action.payload
    })
  },
})

export default imagesSlice
