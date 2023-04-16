/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"
import {
  checkToken,
  forgotPassword,
  getUserInfo,
  login,
  resetPassword,
  signup,
} from "./actions"

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 10000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer)
    toast.addEventListener("mouseleave", Swal.resumeTimer)
  },
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    accessToken: "",
    userInfo: null,
    userId: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    logout: (state, action) => {
      state.status = "idle"
      Toast.fire({
        title: "Đăng xuất",
        text: "Đăng xuất thành công",
        icon: "success",
      })
      state.userInfo = {}
      state.accessToken = ""
      localStorage.removeItem("accessToken")
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getUserInfo.pending, (state, action) => {
      //     state.status = "loading"
      // })
      // .addCase(getUserInfo.fulfilled, (state, action) => {
      //     if (action.payload.id) {
      //         state.status = "user"
      //     }
      //     state.userInfo = action.payload
      // })
      // .addCase(getUserInfo.rejected, (state, action) => {
      //     state.status = "idle"
      // })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.status === "OK") {
          state.status = "user"
          state.userInfo = action.payload.data.userInfo
          state.accessToken = "Bearer " + action.payload.data.accessToken
          localStorage.setItem("accessToken", "Bearer " + action.payload.data.accessToken)
          Toast.fire({
            title: "Đăng nhập",
            text: "Đăng nhập thành công",
            icon: "success",
          })
          window.history.back()
        } else {
          state.status = "idle"
          Toast.fire({
            title: "Đăng nhập",
            text: action.payload.message,
            icon: "warning",
          })
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle"
        Toast.fire({
          title: "Đăng nhập",
          text: action.error.message,
          icon: "error",
        })
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
        state.status = "idle"
        Toast.fire({
          title: "Đăng ký",
          text: action.error.message,
          icon: "error",
        })
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "user"
        state.accessToken = "Bearer " + localStorage.getItem("accessToken")
        state.userInfo = action.payload.data.userInfo
        Toast.fire({
          title: "Đăng nhập",
          text: "Đăng nhập thành công",
          icon: "success",
        })
        console.log(action.payload)
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        if (action.payload.status === "OK") {
          state.status = "idle"
          Toast.fire({
            title: "Quên mật khẩu",
            text: action.payload.message,
            icon: "success",
          })
        } else {
          state.status = "warning"
          Toast.fire({
            title: "Quên mật khẩu",
            text: action.payload.message,
            icon: "warning",
          })
        }
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "error"
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

export default authSlice
