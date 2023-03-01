import axios from 'axios'
import queryString from 'query-string'
import Swal from 'sweetalert2'
// Thiết lập cấu hình mặc định cho http request
const axiosClient = axios.create({
    baseURL: 'http://222.255.238.159:8080/',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
})
axiosClient.interceptors.request.use(async (config) => {
    // Xử lý token
    config.headers.Authorization = localStorage.getItem('accessToken')
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
                title: 'Cảnh báo đăng nhập',
                text: 'Phát hiện truy cập không hợp lệ, vui lòng đăng nhập lại!',
                icon: 'warning',
            }).then(() => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userInfo')
                localStorage.removeItem('userInfoGoogle');
                window.location.href = '/auth/login'
            })
        }
        return response
    },
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            Swal.fire({
                title: 'Cảnh báo đăng nhập',
                text: 'Phát hiện truy cập không hợp lệ, vui lòng đăng nhập lại!',
                icon: 'warning',
                button: 'OK',
            }).then(() => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userInfo')
                localStorage.removeItem('userInfoGoogle');
                window.location.href = '/auth/login'
            })
        }
        throw error
    }
)

export default axiosClient
