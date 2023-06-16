import { createAsyncThunk } from "@reduxjs/toolkit/dist"
import tagsApi from "~/services/tagsApi"

const { createSlice } = require("@reduxjs/toolkit")

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload
    })
  },
})

export const fetchTags = createAsyncThunk("tags/fetchTags", async (params) => {
  const response = await tagsApi.getAll(params)
  return response.data.data
})

export default tagsSlice
