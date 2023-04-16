import axiosClient from "./axiosClient"

const baseUrl = "/api/auth"
const authApi = {
  login: (userInfo) => {
    const requestUrl = `${baseUrl}/signin`
    return axiosClient.post(requestUrl, userInfo)
  },
  signup: (userInfo) => {
    const requestUrl = `${baseUrl}/signup`
    return axiosClient.post(requestUrl, userInfo)
  },
  getUserInfo: (username) => {
    const requestUrl = `/users/get-info?username=${username}`
    return axiosClient.get(requestUrl)
  },
  changePassword: (data) => {
    const requestUrl = `${baseUrl}/change-password`
    return axiosClient.post(requestUrl, data)
  },
  forgotPassword: (body) => {
    const requestUrl = `${baseUrl}/forgot_password`
    return axiosClient.post(requestUrl, body)
  },
  checkToken: (token) => {
    const requestUrl = `${baseUrl}/reset_password?token=${token}`
    return axiosClient.get(requestUrl)
  },
  resetPassword: (body) => {
    const requestUrl = `${baseUrl}/reset_password`
    return axiosClient.post(requestUrl, body)
  },
}

export default authApi
