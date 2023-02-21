import { createAsyncThunk } from '@reduxjs/toolkit'
import categoriesApi from '~/apis/categoriesApi'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (params) => {
    const response = await categoriesApi.getAll(params)
    return response.data.data.categories
})
