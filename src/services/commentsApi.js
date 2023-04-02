import queryString from 'query-string'
import axiosClient from './axiosClient'

// API comment post
const baseUrl = '/posts/comment'
const commentsApi = {
  getCommentList: (params) => {
    const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
    return axiosClient.get(requestUrl)
  },
  addComment: (commentInfo) => {
    const requestUrl = `${baseUrl}/add`
    return axiosClient.post(requestUrl, commentInfo)
  },
  updateComment: (commentInfo) => {
    const requestUrl = `${baseUrl}/edit`
    return axiosClient.put(requestUrl, commentInfo)
  },
  deleteComment: (commentId) => {
    const requestUrl = `${baseUrl}/delete/${commentId}`
    return axiosClient.delete(requestUrl)
  },
}
//

export default commentsApi
