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
  getAllByYear: (year) => {
    const requestUrl = `${baseUrl}/find-all-by-year?year=${year}`
    return axiosClient.get(requestUrl)
  },
  getById: (id) => {
    const requestUrl = `${baseUrl}/${id}`
    return axiosClient.get(requestUrl)
  },
}

export default admissionApi
