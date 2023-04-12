import { createAsyncThunk } from "@reduxjs/toolkit"
import tagsApi from "~/services/tagsApi"

export const fetchTags = createAsyncThunk("tags/fetchTags", async (params) => {
  const response = await tagsApi.getAll(params)
  return response.data.data
})
