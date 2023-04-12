// Import các thư viện cần thiết
import axios from "axios"
import queryString from "query-string"
import { env } from "~/utils/constants/env"

// Thiết lập cấu hình mặc định cho http request
const axiosClient = axios.create({
  baseURL: env.BACKEND_URL, // Đường dẫn backend API
  headers: {
    "content-type": "application/json", // Thiết lập header để truyền dữ liệu dạng JSON
  },
  paramsSerializer: (params) => queryString.stringify(params), // Thiết lập query params dạng chuỗi để gửi đi
})

axiosClient.interceptors.request.use(async (config) => {
  // Xử lý token, thêm vào header của request
  config.headers.Authorization = localStorage.getItem("accessToken")
  return config
})

axiosClient.interceptors.request.use(
  (response) => {
    return response
  },
  (error) => {
    throw error
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    if (response.status === 401 || response.status === 403) {
      // Xử lý khi truy cập không hợp lệ, cần đăng nhập lại
      // Swal.fire({
      //   title: 'Cảnh báo đăng nhập',
      //   text: 'Phát hiện truy cập không hợp lệ, vui lòng đăng nhập lại!',
      //   icon: 'warning',
      // }).then(() => {
      //   localStorage.removeItem('accessToken') // Xóa token khỏi local storage
      //   localStorage.removeItem('userInfo')
      //   localStorage.removeItem('userInfoGoogle')
      //   window.location.href = '/auth/login' // Chuyển hướng đến trang đăng nhập
      // })
    }
    return response
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      // Xử lý khi truy cập không hợp lệ, cần đăng nhập lại
      // Swal.fire({
      //   title: 'Cảnh báo đăng nhập',
      //   text: 'Phát hiện truy cập không hợp lệ, vui lòng đăng nhập lại!',
      //   icon: 'warning',
      // }).then(() => {
      //   localStorage.removeItem('accessToken') // Xóa token khỏi local storage
      //   localStorage.removeItem('userInfo')
      //   localStorage.removeItem('userInfoGoogle')
      //   window.location.href = '/auth/login' // Chuyển hướng đến trang đăng nhập
      // })
    }
    throw error
  }
)

export default axiosClient
