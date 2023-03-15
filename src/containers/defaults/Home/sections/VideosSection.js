import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { defaultAvatar } from '~/utils/constants/default'

export default function VideosSection() {
    const [videos, setVideos] = useState([])
    const [pageToken, setPageToken] = useState('')
    const [loading, setLoading] = useState(false)

    const loadMoreVideos = async () => {
        setLoading(true)
        const response = await axios
            .get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    channelId: 'UC2qKiLt6CGASAsL7ZmAou4g', // Thay CHANNEL_ID bằng ID của kênh YouTube bạn muốn lấy danh sách video
                    maxResults: 3, // Số lượng video bạn muốn lấy
                    pageToken: pageToken,
                    key: 'AIzaSyAS1KDnvd2dT6OeVnOwYCxtzlD4xGTsAi8', // Thay YOUR_API_KEY bằng API key bạn đã tạo
                },
            })
            .finally(() => setLoading(false))
        if (response.data.items.length > 0) {
            setVideos([...videos, ...response.data.items])
            setPageToken(response.data.nextPageToken)
        } else {
            setPageToken('')
        }
    }

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                    params: {
                        part: 'snippet',
                        channelId: 'UC2qKiLt6CGASAsL7ZmAou4g', // Thay CHANNEL_ID bằng ID của kênh YouTube bạn muốn lấy danh sách video
                        maxResults: 3, // Số lượng video bạn muốn lấy
                        key: 'AIzaSyAS1KDnvd2dT6OeVnOwYCxtzlD4xGTsAi8', // Thay YOUR_API_KEY bằng API key bạn đã tạo
                    },
                }
            )
            setVideos(response.data.items)
            setPageToken(response.data.nextPageToken)
        }
        fetchVideos()
    }, [])

    console.log(videos)
    const renderVideosCard = () => {
        return (
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {videos?.map((video) => (
                    <div
                        key={video.id.videoId}
                        className="nc-Card10V2 relative flex flex-col h-full"
                        data-nc-id="Card10V2"
                    >
                        <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-12 sm:aspect-h-9 overflow-hidden z-0">
                            <div>
                                <div
                                    className="nc-PostFeaturedMedia relative  w-full h-full "
                                    data-nc-id="PostFeaturedMedia"
                                >
                                    <div
                                        className="nc-NcImage absolute inset-0"
                                        data-nc-id="NcImage"
                                    >
                                        <iframe
                                            className="object-cover w-full h-full"
                                            src={`https://www.youtube.com/embed/${video?.id?.videoId}?autoplay=1&mute=1`}
                                            title={video?.snippet?.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-3 inset-x-3 flex justify-between items-start space-x-4">
                            <div
                                className="nc-CategoryBadgeList flex flex-wrap space-x-2"
                                data-nc-id="CategoryBadgeList"
                            >
                                <div className="transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-red-800 bg-red-100 hover:bg-red-800">
                                    Video
                                </div>
                            </div>
                            <div
                                className="nc-PostCardSaveAction flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 "
                                data-nc-id="PostCardSaveAction"
                            >
                                <button
                                    className="nc-NcBookmark relative rounded-full flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                                    data-nc-id="NcBookmark"
                                    data-nc-bookmark-post-id="DEMO_POSTS_VIDEO_7"
                                    title="Lưu vào danh sách đang đọc"
                                >
                                    <svg
                                        width={24}
                                        height={24}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2.5 mt-4 px-4">
                            <div
                                className="nc-PostCardMetaV2 inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 text-xs leading-none"
                                data-nc-id="PostCardMetaV2"
                            >
                                <div className="relative flex items-center space-x-2">
                                    <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-9 w-9 text-base ring-1 ring-white dark:ring-neutral-900">
                                        <img
                                            className="absolute inset-0 w-full h-full object-cover"
                                            src={defaultAvatar}
                                            alt="Bác Phạm Văn Bên"
                                            title="Bác Phạm Văn Bên"
                                        />
                                        <span className="wil-avatar__name">
                                            B
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="block font-semibold text-base">
                                            <span className="line-clamp-1">
                                                {video.snippet.title}
                                            </span>
                                        </h2>
                                        <div className="flex mt-1.5">
                                            <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                                                KTX Cỏ May
                                            </span>
                                            <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
                                                ·
                                            </span>
                                            <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                                                {moment(
                                                    video.snippet.publishedAt
                                                ).format('ll')}
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
        <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
            <div className="relative container">
                <div className="nc-SectionGridPosts relative py-16 lg:py-28">
                    <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 text-neutral-900 dark:text-neutral-50">
                        <div className="text-center w-full max-w-2xl mx-auto ">
                            <h2 className="text-3xl md:text-4xl font-semibold">
                                Khám phá Video
                            </h2>
                            <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
                                Di chuột vào thẻ để xem video 🥡
                            </span>
                        </div>
                    </div>
                    {renderVideosCard()}
                    <div className="flex flex-col mt-20 justify-center items-center gap-4">
                        {loading && 'Đang tải thêm video...'}
                        {pageToken && (
                            <button
                                className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                                onClick={loadMoreVideos}
                                disabled={loading}
                            >
                                {loading ? 'Đang tải...' : 'Xem thêm'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
