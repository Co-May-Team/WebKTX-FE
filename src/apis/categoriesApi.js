import axiosClient from './axiosClient'

const baseUrl = '/category'
const categoriesApi = {
  getAll: () => {
    const requestUrl = `${baseUrl}`
    return axiosClient.get(requestUrl)
  },
}
//

export default categoriesApi
