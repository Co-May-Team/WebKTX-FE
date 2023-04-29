import axiosClient from "./axiosClient"

const baseUrl = "/admission"
const admissionApi = {
  submit: (data) => {
    const requestUrl = `${baseUrl}/submit`
    return axiosClient.post(requestUrl, data)
  },
  uploadFiles: (formData) => {
    const requestUrl = `${baseUrl}/upload-files`
    return axiosClient.post(requestUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  genFile: (data) => {
    const requestUrl = `${baseUrl}/gen-file`
    return axiosClient.post(requestUrl, data, {
      responseType: "blob",
    })
  },
}
//

export default admissionApi
