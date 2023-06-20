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
        title: "Cảnh báo quyền",
        text: "Đăng nhập đã hết hạn hoặc bạn không có quyền thực hiện hành đồng này. Vui lòng thực hiện đăng xuất và đăng nhập lại đúng tài khoản!",
        icon: "warning",
      })
    }
    return response
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      Swal.fire({
        title: "Cảnh báo quyền",
        text: "Đăng nhập đã hết hạn hoặc bạn không có quyền thực hiện hành đồng này. Vui lòng thực hiện đăng xuất và đăng nhập lại đúng tài khoản!",
        icon: "warning",
      })
    } else {
      Swal.fire({
        title: "Lỗi",
        text: "Đã có lỗi trong quá trình truy vấn dữ liệu: " + error.message,
        icon: "warning",
      })
    }
  }
)

export default axiosClient
