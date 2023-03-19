import { createAsyncThunk } from '@reduxjs/toolkit'
import imagesApi from '~/services/imagesApi'

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (params) => {
    const response = await imagesApi.getAll(params)
    return response.data.data
  }
)
