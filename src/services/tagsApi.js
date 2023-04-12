import axiosClient from "./axiosClient"

const baseUrl = "/tags"
const tagsApi = {
  getAll: () => {
    const requestUrl = `${baseUrl}`
    return axiosClient.get(requestUrl)
  },
}
//

export default tagsApi
