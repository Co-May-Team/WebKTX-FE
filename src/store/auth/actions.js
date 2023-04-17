import { createAsyncThunk } from "@reduxjs/toolkit"
import authApi from "~/services/authApi"
import authSlice from "./slice"

export const { setStatus, logout } = authSlice.actions

export const login = createAsyncThunk("auth/login", async (userInfo) => {
  const response = await authApi.login(userInfo)
  return response.data
})
export const signup = createAsyncThunk("auth/signup", async (userInfo) => {
  const response = await authApi.signup(userInfo)
  return response.data
})
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    const response = await authApi.forgotPassword(email)
    return response.data
  }
)
export const checkToken = createAsyncThunk("auth/checkToken", async (token) => {
  const response = await authApi.checkToken(token)
  return response.data
})
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (body) => {
    const response = await authApi.resetPassword(body)
    return response.data
  }
)
export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (username) => {
    const response = await authApi.getUserInfo(username)
    return response.data
  }
)
