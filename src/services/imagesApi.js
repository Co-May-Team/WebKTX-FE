import axios from "axios"
import queryString from "query-string"

const apiKey = "AIzaSyAS1KDnvd2dT6OeVnOwYCxtzlD4xGTsAi8"

const imagesApi = {
  getFolders: (params) => {
    const folderParentId = "19rP6BezjZtNZYNYYLuW904GjkGZeI72a"
    const requestUrl = `https://www.googleapis.com/drive/v3/files?q='${folderParentId}'%20in%20parents&fields=nextPageToken,files(id,name,mimeType,createdTime)&key=${apiKey}&${queryString.stringify(
      params
    )}`
    return axios.get(requestUrl)
  },
  getImagesInFolder: (folderId) => {
    const requestUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'%20in%20parents&fields=files(id,name,webContentLink,thumbnailLink)&key=${apiKey}`
    return axios.get(requestUrl)
  },
}
//

export default imagesApi
