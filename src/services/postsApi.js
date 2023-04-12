import queryString from "query-string"
import axiosClient from "./axiosClient"

const baseUrl = "/posts"
const postsApi = {
  getAll: (params, filters) => {
    const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
    return axiosClient.post(requestUrl, { ...filters })
  },
  get: (postId) => {
    const requestUrl = `${baseUrl}/${postId}`
    return axiosClient.get(requestUrl)
  },
  addPost: (postInfo) => {
    const requestUrl = `${baseUrl}/add`
    return axiosClient.post(requestUrl, postInfo)
  },
  updatePost: (postInfo) => {
    const requestUrl = `${baseUrl}/edit`
    return axiosClient.put(requestUrl, postInfo)
  },
  deletePost: (postId) => {
    const requestUrl = `${baseUrl}/delete/${postId}`
    return axiosClient.delete(requestUrl)
  },
  likePost: (postId) => {
    const requestUrl = `${baseUrl}/${postId}/likes`
    return axiosClient.get(requestUrl)
  },
  uploadImages: (data) => {
    const url = "api/upload-images"
    return axiosClient.post(url, data)
  },
  getAllCategory: () => {
    const requestUrl = "/category"
    return axiosClient.get(requestUrl)
  },
  getAllTag: () => {
    const requestUrl = "/tags"
    return axiosClient.get(requestUrl)
  },
}
//

export default postsApi
