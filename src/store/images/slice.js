import { createAsyncThunk } from "@reduxjs/toolkit/dist"
import imagesApi from "~/services/imagesApi"

const { createSlice } = require("@reduxjs/toolkit")

const imagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.images = action.payload
    })
  },
})

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async (params) => {
    const response = await imagesApi.getAll(params)
    return response.data.data
  }
)

export default imagesSlice
