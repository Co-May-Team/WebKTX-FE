import { createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '~/apis/authApi'
import authSlice from './slice'

export const { setStatus, logout } = authSlice.actions

// export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
//     const userId = JSON.parse(localStorage.getItem("userInfo")).id
//     const response = await employeesApi.getEmployeeDetailById(userId)
//     return response.data.data
// })
export const login = createAsyncThunk('auth/login', async (userInfo) => {
    const response = await authApi.login(userInfo)
    return response.data
})
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email) => {
        const response = await authApi.forgotPassword(email)
        return response.data
    }
)
export const checkToken = createAsyncThunk('auth/checkToken', async (token) => {
    const response = await authApi.checkToken(token)
    return response.data
})
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (body) => {
        const response = await authApi.resetPassword(body)
        return response.data
    }
)
