/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit/dist"
import Swal from "sweetalert2"
import authApi from "~/services/authApi"

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer)
    toast.addEventListener("mouseleave", Swal.resumeTimer)
  },
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "anonymous",
    accessToken: "",
    userInfo: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    logout: (state, action) => {
      state.status = "anonymous"
      Toast.fire({
        title: "Đăng xuất",
        text: "Đăng xuất thành công",
        icon: "success",
      })
      state.userInfo = {}
      state.accessToken = ""
      localStorage.removeItem("accessToken")
      localStorage.removeItem("persist:root")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "isLogining"
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.status === "OK") {
          state.status = "user"
          state.userInfo = action.payload.data.userInfo
          state.accessToken = "Bearer " + action.payload.data.accessToken
          localStorage.setItem(
            "accessToken",
            "Bearer " + action.payload.data.accessToken
          )
          Toast.fire({
            title: "Đăng nhập",
            text: "Đăng nhập thành công",
            icon: "success",
          })
        } else {
          state.status = "anonymous"
          Toast.fire({
            title: "Đăng nhập",
            text: action.payload.message,
            icon: "warning",
          })
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "anonymous"
        Toast.fire({
          title: "Đăng nhập",
          text: "Tài khoản hoặc mật khẩu không chính xác",
          icon: "error",
        })
      })
      .addCase(signup.pending, (state, action) => {
        state.status = "isSigningUp"
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload?.status === "ERROR") {
          Toast.fire({
            title: "Đăng ký",
            text: action.payload.message,
            icon: "warning",
          })
        } else {
          Toast.fire({
            title: "Đăng ký",
            text: action.payload.message,
            icon: "success",
          })
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "anonymous"
        Toast.fire({
          title: "Đăng ký",
          text: "Có lỗi trong quá trình đăng ký, vui lòng thử lại sau",
          icon: "error",
        })
      })
      .addCase(getUserInfo.pending, (state, action) => {
        state.status = "isLoginingWithGoogle"
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        if (action.payload.status === "ERROR") {
          state.status = "auth"
          state.accessToken = "Bearer " + localStorage.getItem("accessToken")
          Toast.fire({
            title: "Đăng nhập với Google",
            text: "Đăng nhập với Google thành công. vui lòng xác thực tài khoản cho lần đầu đăng nhập.",
            icon: "success",
          })
        } else {
          state.status = "user"
          state.accessToken = "Bearer " + localStorage.getItem("accessToken")
          state.userInfo = action.payload.data.userInfo
          Toast.fire({
            title: "Đăng nhập với Google",
            text: "Đăng nhập với Google thành công",
            icon: "success",
          })
        }
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "anonymous"
        Toast.fire({
          title: "Đăng nhập với Google",
          text: "Có lỗi trong quá trình đăng nhập với Google, vui lòng thử lại sau",
          icon: "error",
        })
      })
      .addCase(auth.pending, (state, action) => {
        state.status = "isAuthenticating"
      })
      .addCase(auth.fulfilled, (state, action) => {
        if (action.payload.status === "ERROR") {
          state.status = "auth"
          state.accessToken = "Bearer " + localStorage.getItem("accessToken")
          Swal.fire({
            title: "Xác thực tài khoản",
            text: action.payload.message,
            icon: "warning",
          })
        } else {
          state.status = "user"
          state.accessToken = "Bearer " + localStorage.getItem("accessToken")
          state.userInfo = action.payload.data.userInfo
          Toast.fire({
            title: "Xác thực tài khoản",
            text: "Xác thực tài khoản thành công",
            icon: "success",
          })
        }
      })
      .addCase(auth.rejected, (state, action) => {
        state.status = "error"
        Toast.fire({
          title: "Xác thực tài khoản",
          text: "Xác thực tài khoản không thành công. Lỗi: " + action.error.message,
          icon: "error",
        })
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.status = "isForgetting"
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        if (action.payload.status === "OK") {
          state.status = "anonymous"
          Toast.fire({
            title: "Quên mật khẩu",
            text: action.payload.message,
            icon: "success",
          })
        } else {
          state.status = "anonymous"
          Toast.fire({
            title: "Quên mật khẩu",
            text: action.payload.message,
            icon: "warning",
          })
        }
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "anonymous"
        Toast.fire({
          title: "Quên mật khẩu",
          text: action.error.message,
          icon: "error",
        })
      })
      .addCase(checkToken.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.status = action.payload.status
        if (action.payload.status === "OK") {
          state.userId = action.payload.data.id
          state.message = "Xác thực token thành công!"
        } else {
          state.message = "Xác thực token thất bại!"
        }
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.status = "error"
      })
      .addCase(resetPassword.pending, (state, action) => {
        if (state.status !== "OK") {
          state.status = "loading"
        }
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        if (action.payload.status === "OK") {
          state.status = "success"
          Toast.fire({
            title: "Thiết lập mật khẩu mới",
            text: action.payload.message,
            icon: "success",
          })
        } else {
          state.status = "warning"
          Toast.fire({
            title: "Thiết lập mật khẩu mới",
            text: action.payload.message,
            icon: "warning",
          })
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "error"
        Toast.fire({
          title: "Thiết lập mật khẩu mới",
          text: action.error.message,
          icon: "error",
        })
      })
  },
})

export const { setStatus, logout } = authSlice.actions

export const login = createAsyncThunk("auth/login", async (userInfo) => {
  const response = await authApi.login(userInfo)
  return response.data
})
export const auth = createAsyncThunk("auth/auth", async (userInfo) => {
  const response = await authApi.auth(userInfo)
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

export default authSlice
