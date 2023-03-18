import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import 'react-glide/lib/reactGlide.css'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import imagesApi from '~/apis/imagesApi'
import { Wrapper } from '~/components/Customs'
import { defaultAvatar } from '~/utils/constants/default'

export default function ImagesSection() {
  const navigate = useNavigate()

  const [folders, setFolders] = useState([])
  const [nextPageToken, setNextPageToken] = useState('')
  const [numFolders, setNumFolders] = useState(3)
  const [loading, setLoading] = useState(false)

  const loadMoreImages = async () => {
    setLoading(true)
    const response = await imagesApi.getFolders({ pageSize: 3, pageToken: nextPageToken })

    const folders = response.data.files.filter(
      (file) => file.mimeType === 'application/vnd.google-apps.folder'
    )

    const listImage = await Promise.all(
      folders.map(async (folder) => {
        const images = await imagesApi.getImagesInFolder(folder.id)
        return {
          id: folder.id,
          title: folder.name,
          images: images.data.files,
          createdTime: folder.createdTime,
        }
      })
    )
    setFolders((prevFolders) => [...prevFolders, ...listImage])
    setNextPageToken(response.data.nextPageToken)
    setNumFolders(numFolders + 3)
    setLoading(false)
  }

  useEffect(() => {
    const loadFolders = async () => {
      const response = await imagesApi.getFolders({ pageSize: 3, pageToken: nextPageToken })

      const folders = response.data.files.filter(
        (file) => file.mimeType === 'application/vnd.google-apps.folder'
      )

      const listImage = await Promise.all(
        folders.map(async (folder) => {
          const images = await imagesApi.getImagesInFolder(folder.id)
          return {
            id: folder.id,
            title: folder.name,
            images: images.data.files,
            createdTime: folder.createdTime,
          }
        })
      )
      setFolders(listImage)
      setNextPageToken(response.data.nextPageToken)
    }
    loadFolders()
  }, [])
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  }

  const renderImages = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-3">
        {folders.slice(0, numFolders).map((folder) => (
          <div key={folder.id} className="relative flex flex-col h-full">
            <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-9 aspect-h-7 sm:aspect-h-10 overflow-hidden z-0">
              <div>
                <div className="relative w-full h-full">
                  <div className="absolute inset-0">
                    <img
                      src={folder.images[0].webContentLink}
                      alt={folder.images[0].name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <Slider {...settings}>
                  {folder.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.webContentLink}
                      alt={folder.name}
                      className="object-cover w-full h-full"
                    />
                  ))}
                </Slider>
              </div>
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute top-3 inset-x-3 flex justify-between items-start space-x-4 z-10">
              <div className="flex flex-wrap space-x-2">
                <div className="transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-pink-800 bg-pink-100 hover:bg-pink-800">
                  Hình ảnh
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 ">
                <button
                  className="relative rounded-full flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  title="Lưu vào danh sách đang đọc"
                >
                  <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="space-y-2.5 mt-4">
              <div className="inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 text-xs leading-none">
                <div className="relative flex items-center space-x-2">
                  <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-9 w-9 text-base ring-1 ring-white dark:ring-neutral-900">
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src={defaultAvatar}
                      alt="Bác Phạm Văn Bên"
                      title="Bác Phạm Văn Bên"
                    />
                    <span className="wil-avatar__name">Bác Phạm Văn Bên</span>
                  </div>
                  <div>
                    <h2 className="block font-semibold text-base">
                      <span className="line-clamp-1">{folder?.title}</span>
                    </h2>
                    <div className="flex mt-1.5">
                      <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                        KTX Cỏ May
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
                        ·
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                        {moment(folder?.createdTime).format('ll')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <Wrapper>
      <div className="relative py-16 lg:py-28">
        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 text-neutral-900 dark:text-neutral-50">
          <div className="text-center w-full max-w-2xl mx-auto ">
            <h2 className="text-3xl md:text-4xl font-semibold text-uppercase">
              Hình ảnh Cỏ May
            </h2>
            <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400"></span>
          </div>
        </div>
        {renderImages()}
        <div className="flex flex-col mt-20 justify-center items-center gap-4">
          {loading && 'Đang tải thêm hình ảnh...'}
          {nextPageToken && (
            <button
              className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
              onClick={loadMoreImages}
              disabled={loading}
            >
              {loading ? 'Đang tải...' : 'Xem thêm'}
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
