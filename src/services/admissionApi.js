import axiosClient from "./axiosClient"

const baseUrl = "/admission"
const admissionApi = {
  submit: (data) => {
    const requestUrl = `${baseUrl}/submit`
    return axiosClient.post(requestUrl, data)
  },
  uploadFiles: (data) => {
    const requestUrl = `${baseUrl}/upload-files`
    return axiosClient.post(requestUrl, data)
  },
  genFile: (data) => {
    const requestUrl = `${baseUrl}/gen-file`
    return axiosClient.post(requestUrl, data)
  },
}
//

export default admissionApi
