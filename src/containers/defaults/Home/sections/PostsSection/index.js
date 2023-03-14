import moment from 'moment'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Spinner } from 'reactstrap'
import { Wrapper } from '~/components/Customs'
import Pagination from '~/components/Pagination'
import { fetchPosts } from '~/store/posts/actions'
import { postsSelector } from '~/store/selectors'
import convertToUrl from '~/utils/commons/convertToUrl'

const AVERAGE_READING_SPEED = 200 // Tốc độ đọc trung bình của một người (từ/phút)

function PostsSection() {
    const listPost = useSelector(postsSelector).posts
    const status = useSelector(postsSelector).status
    const pagination = useSelector(postsSelector).pagination

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [params, setParams] = useState({
        page: 1,
    })

    const handlePageChange = (newPage) => {
        setParams({
            ...params,
            page: newPage,
        })
    }
    useEffect(() => {
        const requestUrl =
            location.pathname + '?' + queryString.stringify(params)
        dispatch(fetchPosts({ params, filters: {} }))
        navigation(requestUrl)
    }, [params])

    function readingTime(content) {
        const words = content.split(' ').length
        const timeInMinutes = words / AVERAGE_READING_SPEED
        return `${Math.round(timeInMinutes)} phút đọc`
    }

    return (
        <Wrapper>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 md:gap-8">
                {
                    status === "loading" ? <Spinner /> : (
                        <>
                            <div className="nc-CardLarge1 nc-CardLarge1--hasAnimation relative flex flex-col-reverse md:flex-row justify-end ">
                                <div className="md:absolute z-10 md:left-0 md:top-1/2 md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-1/2 xl:w-2/5">
                                    <div className="nc-CardLarge1__left p-4 sm:p-8 xl:py-14 md:px-10 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg shadow-lg rounded-3xl space-y-3 sm:space-y-5 !border-opacity-0 -- nc-dark-box-bg">
                                        <div
                                            className="nc-CategoryBadgeList flex flex-wrap space-x-2"
                                            data-nc-id="CategoryBadgeList"
                                        >
                                            <NavLink
                                                className="transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-yellow-800 bg-yellow-100 hover:bg-yellow-800"
                                                to={'/thong-bao'}
                                            >
                                                Thông báo
                                            </NavLink>
                                        </div>
                                        <h2 className="nc-card-title text-xl sm:text-2xl font-semibold ">
                                            <NavLink
                                                className="line-clamp-2"
                                                title="Lenovo’s smarter devices stoke professional passions "
                                                to={`/${convertToUrl(listPost[0]?.title)}/${listPost[0]?.postId
                                                    }`}
                                            >
                                                {listPost[0]?.title}
                                            </NavLink>
                                        </h2>
                                        <div className="hidden sm:block sm:mt-2">
                                            <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                                                {listPost[0]?.summary}
                                            </span>
                                        </div>
                                        <NavLink
                                            className="nc-CardAuthor2 relative inline-flex items-center relative"
                                            data-nc-id="CardAuthor2"
                                            to={`/${convertToUrl(listPost[0]?.title)}/${listPost[0]?.postId
                                                }`}
                                        >
                                            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-base flex-shrink-0 mr-3">
                                                <img
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    src={listPost[0]?.thumbnail}
                                                    alt={listPost[0]?.title}
                                                />
                                                <span className="wil-avatar__name">F</span>
                                            </div>
                                            <div>
                                                <h2 className="text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                                                    BQL KTX Cỏ May
                                                </h2>
                                                <span className="flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                                    <span>
                                                        {moment(
                                                            listPost[0]?.createdAt
                                                        ).fromNow()}
                                                    </span>
                                                </span>
                                            </div>
                                        </NavLink>
                                        <div className="flex items-center justify-between mt-3">
                                            <div
                                                className="nc-PostCardLikeAndComment flex items-center space-x-2"
                                                data-nc-id="PostCardLikeAndComment"
                                            >
                                                <button
                                                    className="nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50 dark:bg-rose-100"
                                                    title="Lượt xem"
                                                    data-nc-id="PostCardLikeAction"
                                                >
                                                    <svg
                                                        width={24}
                                                        height={24}
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1}
                                                            d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="ml-1 text-rose-600">
                                                        {listPost[0]?.viewed}
                                                    </span>
                                                </button>
                                                <NavLink
                                                    className="nc-PostCardCommentBtn relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden sm:flex  px-3 h-8 text-xs focus:outline-none"
                                                    title="Bình luận"
                                                    data-nc-id="PostCardCommentBtn"
                                                    to=""
                                                >
                                                    <svg
                                                        width={24}
                                                        height={24}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1}
                                                            d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V14.25C19.25 15.3546 18.3546 16.25 17.25 16.25H14.625L12 19.25L9.375 16.25H6.75C5.64543 16.25 4.75 15.3546 4.75 14.25V6.75Z"
                                                        />
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9.5 11C9.5 11.2761 9.27614 11.5 9 11.5C8.72386 11.5 8.5 11.2761 8.5 11C8.5 10.7239 8.72386 10.5 9 10.5C9.27614 10.5 9.5 10.7239 9.5 11Z"
                                                        />
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12.5 11C12.5 11.2761 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.2761 11.5 11C11.5 10.7239 11.7239 10.5 12 10.5C12.2761 10.5 12.5 10.7239 12.5 11Z"
                                                        />
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.5 11C15.5 11.2761 15.2761 11.5 15 11.5C14.7239 11.5 14.5 11.2761 14.5 11C14.5 10.7239 14.7239 10.5 15 10.5C15.2761 10.5 15.5 10.7239 15.5 11Z"
                                                        />
                                                    </svg>
                                                    <span className="ml-1 text-neutral-900 dark:text-neutral-200">
                                                        0
                                                    </span>
                                                </NavLink>
                                            </div>
                                            <div
                                                className="nc-PostCardSaveAction flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 "
                                                data-nc-id="PostCardSaveAction"
                                            >
                                                <span>
                                                    {readingTime(listPost[0]?.content)}
                                                </span>
                                                <button
                                                    className="nc-NcBookmark relative rounded-full flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-50 bg-opacity-20 hover:bg-opacity-50 dark:bg-neutral-800 dark:bg-opacity-30 dark:hover:bg-opacity-50"
                                                    data-nc-id="NcBookmark"
                                                    data-nc-bookmark-post-id="DEMO_POSTS_1"
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
                                    </div>
                                </div>
                                <div className="w-full md:w-4/5 lg:w-2/3">
                                    <NavLink
                                        className="nc-CardLarge1__right block relative"
                                        to={`/${convertToUrl(listPost[0]?.title)}/${listPost[0]?.postId
                                            }`}
                                    >
                                        <div
                                            className="nc-NcImage aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative"
                                            data-nc-id="NcImage"
                                        >
                                            <img
                                                src={listPost[0].thumbnail}
                                                className="absolute inset-0 object-cover rounded-3xl"
                                                alt={listPost[0].title}
                                                title={listPost[0].title}
                                            />
                                        </div>
                                        <div
                                            className="nc-PostTypeFeaturedIcon absolute w-8 h-8 md:w-10 md:h-10 right-6 top-6"
                                            data-nc-id="PostTypeFeaturedIcon"
                                        />
                                    </NavLink>
                                </div>
                            </div>
                            {listPost.slice(1, 15).map((item, index) => (
                                <div
                                    key={item?.postId}
                                    className="nc-Card6 relative flex group flex-col-reverse sm:flex-row sm:items-center p-4  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] h-full"
                                    data-nc-id="Card6"
                                >
                                    <NavLink
                                        className="absolute inset-0 z-0"
                                        to={`/${convertToUrl(item?.title)}/${item?.postId}`}
                                    ></NavLink>
                                    <div className="flex flex-col flex-grow">
                                        <div className="space-y-3 mb-4">
                                            <div
                                                className="nc-CategoryBadgeList flex flex-wrap space-x-2"
                                                data-nc-id="CategoryBadgeList"
                                            >
                                                <NavLink
                                                    className="transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-red-800 bg-red-100 hover:bg-red-800"
                                                    to={'/thong-bao'}
                                                >
                                                    Thông báo
                                                </NavLink>
                                            </div>
                                            <h2 className="block font-semibold text-base">
                                                <NavLink
                                                    className="line-clamp-2"
                                                    title="360-degree video: How Microsoft deployed a datacenter to the bottom of the ocean"
                                                    to={`/${convertToUrl(item?.title)}/${item?.postId
                                                        }`}
                                                >
                                                    {item?.title}
                                                </NavLink>
                                            </h2>
                                            <div className="hidden sm:block sm:mt-2">
                                                <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                                                    {item?.summary}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center flex-wrap justify-between mt-auto">
                                            <div
                                                className="nc-PostCardLikeAndComment flex items-center space-x-2 relative"
                                                data-nc-id="PostCardLikeAndComment"
                                            >
                                                <button
                                                    className="nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50 dark:bg-rose-100"
                                                    title="Lượt xem"
                                                    data-nc-id="PostCardLikeAction"
                                                >
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="1"
                                                            d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                                                            clip-rule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    <span className="ml-1 text-rose-600">
                                                        {item?.viewed}
                                                    </span>
                                                </button>
                                                <NavLink
                                                    className="nc-PostCardCommentBtn relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden sm:flex  px-3 h-8 text-xs focus:outline-none"
                                                    title="Bình luận"
                                                    data-nc-id="PostCardCommentBtn"
                                                    to="#"
                                                >
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="1"
                                                            d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V14.25C19.25 15.3546 18.3546 16.25 17.25 16.25H14.625L12 19.25L9.375 16.25H6.75C5.64543 16.25 4.75 15.3546 4.75 14.25V6.75Z"
                                                        ></path>
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9.5 11C9.5 11.2761 9.27614 11.5 9 11.5C8.72386 11.5 8.5 11.2761 8.5 11C8.5 10.7239 8.72386 10.5 9 10.5C9.27614 10.5 9.5 10.7239 9.5 11Z"
                                                        ></path>
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M12.5 11C12.5 11.2761 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.2761 11.5 11C11.5 10.7239 11.7239 10.5 12 10.5C12.2761 10.5 12.5 10.7239 12.5 11Z"
                                                        ></path>
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M15.5 11C15.5 11.2761 15.2761 11.5 15 11.5C14.7239 11.5 14.5 11.2761 14.5 11C14.5 10.7239 14.7239 10.5 15 10.5C15.2761 10.5 15.5 10.7239 15.5 11Z"
                                                        ></path>
                                                    </svg>
                                                    <span className="ml-1 text-neutral-900 dark:text-neutral-200">
                                                        0
                                                    </span>
                                                </NavLink>
                                            </div>
                                            <div
                                                className="nc-PostCardSaveAction flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 relative"
                                                data-nc-id="PostCardSaveAction"
                                            >
                                                <span>{readingTime(item?.content)}</span>
                                                <button
                                                    className="nc-NcBookmark relative rounded-full flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                                                    data-nc-id="NcBookmark"
                                                    data-nc-bookmark-post-id="DEMO_POSTS_10"
                                                    title="Lưu vào danh sách đang đọc"
                                                >
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                            fill="none"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="1"
                                                            d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <NavLink
                                        className="block relative flex-shrink-0 w-full sm:w-40 h-40 sm:h-full sm:ml-5 rounded-2xl overflow-hidden sm:mb-0 mb-3"
                                        to={`/${convertToUrl(item?.title)}/${item?.postId}`}
                                    >
                                        <div
                                            className="nc-NcImage absolute inset-0"
                                            data-nc-id="NcImage"
                                        >
                                            <img
                                                src={item?.thumbnail}
                                                className="object-cover w-full h-full"
                                                alt={item?.title}
                                                title={item?.title}
                                            />
                                        </div>
                                        <span className="absolute bottom-1 left-1">
                                            <div
                                                className="nc-PostTypeFeaturedIcon "
                                                data-nc-id="PostTypeFeaturedIcon"
                                            ></div>
                                        </span>
                                    </NavLink>
                                </div>
                            ))}
                        </>
                    )
                }
            </div>
            <Pagination
                pagination={{ ...pagination, page: params.page }}
                onPageChange={handlePageChange}
            />
        </Wrapper>
    )
}

export default PostsSection
