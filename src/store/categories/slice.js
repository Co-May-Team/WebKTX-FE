import { createAsyncThunk } from "@reduxjs/toolkit/dist"
import categoriesApi from "~/services/categoriesApi"

const { createSlice } = require("@reduxjs/toolkit")

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
  },
})

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (params) => {
    const response = await categoriesApi.getAll(params)
    return response.data.data.categories
  }
)

export default categoriesSlice
