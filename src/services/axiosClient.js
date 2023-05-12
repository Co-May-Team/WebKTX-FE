// Import các thư viện cần thiết
import axios from "axios"
import queryString from "query-string"
import Swal from "sweetalert2"
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
      Swal.fire({
        title: "Cảnh báo đăng nhập",
        text: "Phát hiện truy cập không hợp lệ, vui lòng đăng nhập lại để xác thực!",
        icon: "warning",
      }).then(() => {
        window.location.href = "/dang-xuat" // Chuyển hướng đến trang đăng nhập
      })
    }
    return response
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      Swal.fire({
        title: "Cảnh báo đăng nhập",
        text: "Phát hiện truy cập không hợp lệ, vui lòng đăng nhập lại để xác thực!",
        icon: "warning",
      })
      window.location.href = "/dang-xuat"
    } else {
      Swal.fire({
        title: "Cảnh báo lỗi",
        text: "Đã xảy ra lỗi, vui lòng liên hệ nhà phát triển ứng dụng!",
        icon: "error",
      })
    }
  }
)

export default axiosClient
