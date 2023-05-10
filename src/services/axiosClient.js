// Import các thư viện cần thiết
import axios from "axios"
import queryString from "query-string"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { logout } from "~/store/auth/actions"
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
    const dispatch = useDispatch()
    if (response.status === 401 || response.status === 403) {
      Swal.fire({
        title: "Cảnh báo đăng nhập",
        text: "Phát hiện truy cập không hợp lệ, vui lòng đăng nhập lại để xác thực!",
        icon: "warning",
      }).then(() => {
        dispatch(logout())
        window.location.href = "/auth/login" // Chuyển hướng đến trang đăng nhập
      })
    }
    return response
  },
  (error) => {
    const dispatch = useDispatch()
    if (error.response.status === 401 || error.response.status === 403) {
      Swal.fire({
        title: "Cảnh báo đăng nhập",
        text: "Phát hiện truy cập không hợp lệ, vui lòng đăng nhập lại để xác thực!",
        icon: "warning",
      }).then(() => {
        dispatch(logout())
        window.location.href = "/auth/login" // Chuyển hướng đến trang đăng nhập
      })
    }
    throw error
  }
)

export default axiosClient
