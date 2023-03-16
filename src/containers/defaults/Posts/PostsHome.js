/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroll-component'
import { trackWindowScroll } from 'react-lazy-load-image-component'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import postsApi from '~/apis/postsApi'
import { Wrapper } from '~/components/Customs'
import { tagsSelector } from '~/store/selectors'
import convertToUrl from '~/utils/commons/convertToUrl'
import readingTime from '~/utils/commons/readingTime'
import { defaultAvatar } from '~/utils/constants/default'

function PostsHome() {
    const tagList = useSelector(tagsSelector).tags

    const url = useParams().url

    const [loading, setLoading] = useState(false)
    const [postList, setPostList] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)
    const [tagInfo, setTagInfo] = useState(null)

    const [filters, setFilters] = useState({
        tag_id: tagList.filter((tag) => convertToUrl(tag?.tagName) === url)[0]
            .tagId,
    })
    console.log(postList)
    const searchTagByUrl = () => {
        return tagList.filter((tag) => convertToUrl(tag?.tagName) === url)[0]
    }
    const loadMorePosts = async () => {
        await postsApi.getAll({ page: page + 1 }, filters).then((response) => {
            setPostList([...postList, ...response.data.data.posts])
            setPage(page + 1)
            if (response.data.data.posts.length == 0) {
                setHasMore(false)
            }
        })
    }
    document.title = tagInfo?.tagName
        ? `${tagInfo?.tagName} - KTX Cỏ May`
        : 'KTX Cỏ May'
    useEffect(() => {
        const tag = searchTagByUrl()
        setTagInfo(tag)
        setFilters({
            tag_id: tag.tagId,
        })
    }, [url])
    useEffect(() => {
        setLoading(true)
        postsApi.getAll({ page: 1 }, filters).then((response) => {
            setPostList(response.data.data.posts)
            setPage(1)
            setLoading(false)
        })
    }, [filters])

    const renderCardList = () => {
        return postList.map((item) => (
            <div
                key={item?.postId}
                className="nc-Card7 relative flex flex-col group rounded-3xl overflow-hidden z-0 h-full"
                data-nc-id="Card7"
            >
                <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
                    <div
                        className="nc-PostCardLikeAndComment flex items-center space-x-2 relative"
                        data-nc-id="PostCardLikeAndComment"
                    >
                        <button
                            className="nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-100 hover:text-rose-600 dark:hover:text-rose-500"
                            title="Lượt xem"
                            data-nc-id="PostCardLikeAction"
                        >
                            <svg
                                width={24}
                                height={24}
                                fill="none"
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
                            <span className="ml-1 text-neutral-900 dark:text-neutral-200">
                                {item?.viewed}
                            </span>
                        </button>
                        <NavLink
                            className="nc-PostCardCommentBtn relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden xs:flex  px-3 h-8 text-xs focus:outline-none"
                            title="Bình luận"
                            data-nc-id="PostCardCommentBtn"
                            to={`/${convertToUrl(item?.title)}/${item?.postId}`}
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
                        className="nc-PostCardSaveAction flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 relative"
                        data-nc-id="PostCardSaveAction"
                    >
                        <button
                            className="nc-NcBookmark relative rounded-full flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                            data-nc-id="NcBookmark"
                            data-nc-bookmark-post-id="DEMO_POSTS_9"
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
                <NavLink
                    className="flex items-start relative w-full aspect-w-5 aspect-h-5"
                    to={`/${convertToUrl(item?.title)}/${item?.postId}`}
                >
                    <div
                        className="nc-NcImage absolute inset-0 overflow-hidden"
                        data-nc-id="NcImage"
                    >
                        <img
                            src={item?.thumbnail}
                            className="object-cover w-full h-full rounded-3xl "
                            alt="nc-imgs"
                        />
                    </div>
                    <div
                        className="nc-PostTypeFeaturedIcon absolute top-3 left-3 group-hover:hidden"
                        data-nc-id="PostTypeFeaturedIcon"
                    />
                    <span className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
                <div className="absolute bottom-3 inset-x-3 p-4 bg-white dark:bg-neutral-900 flex flex-col flex-grow rounded-3xl group-hover:shadow-2xl transition-shadow">
                    <NavLink
                        className="absolute inset-0"
                        to={`/${convertToUrl(item?.title)}/${item?.postId}`}
                    />
                    <div className="space-y-2.5 mb-3">
                        <div
                            className="nc-CategoryBadgeList flex flex-wrap space-x-2"
                            data-nc-id="CategoryBadgeList"
                        >
                            <div className="transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-red-800 bg-red-100 hover:bg-red-800">
                                {item?.category.categoryName}
                            </div>
                        </div>
                        <h2 className="block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
                            <NavLink
                                className="line-clamp-2"
                                title={item?.title}
                                to={`/${convertToUrl(item?.title)}/${
                                    item?.postId
                                }`}
                            >
                                {item?.title}
                            </NavLink>
                        </h2>
                    </div>
                    <div
                        className="nc-CardAuthor2 relative inline-flex items-center "
                        data-nc-id="CardAuthor2"
                    >
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-base flex-shrink-0 mr-3">
                            <img
                                className="absolute inset-0 w-full h-full object-cover"
                                src={defaultAvatar}
                                alt="Bác Phạm Văn Bên"
                                title="Bác Phạm Văn Bên"
                            />
                            <span className="wil-avatar__name">
                                Bác Phạm Văn Bên
                            </span>
                        </div>
                        <div>
                            <h2 className="text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                                KTX Cỏ May
                            </h2>
                            <span className="flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                <span>
                                    {moment(item?.createdAt).format('llll')}
                                </span>
                                <span className="hidden xs:inline mx-1 transition-opacity opacity-0 group-hover:opacity-100">
                                    ·
                                </span>
                                <span className="hidden xs:inline transition-opacity opacity-0 group-hover:opacity-100">
                                    {readingTime(item?.content)}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }
    return (
        <>
            <Helmet>
                <title>{`${tagInfo?.tagName} - KTX Cỏ May`}</title>
                <meta
                    name="description"
                    content="KTX Cỏ May có diện tích rộng hơn 2.600 m2, thiết kế 4 tầng hiện đại, khang trang. Đó là tâm nguyện của một Doanh nhân người Nam Bộ đã viết nên nhiều câu chuyện, nhiều mảnh đời qua các thế hệ sinh viên trên cả nước, học tập và sinh sống tại TP.HCM."
                />
                <meta
                    name="keywords"
                    content="ktx cỏ may, ký túc xá, cỏ may, co may dormitory"
                />
                <meta name="robots" content="index, follow" />
                <meta
                    property="og:title"
                    content={`${tagInfo?.tagName} - KTX Cỏ May`}
                />
                <meta
                    property="og:description"
                    content="KTX Cỏ May có diện tích rộng hơn 2.600 m2, thiết kế 4 tầng hiện đại, khang trang. Đó là tâm nguyện của một Doanh nhân người Nam Bộ đã viết nên nhiều câu chuyện, nhiều mảnh đời qua các thế hệ sinh viên trên cả nước, học tập và sinh sống tại TP.HCM."
                />
                <meta property="og:image" content="%PUBLIC_URL%/image.jpeg" />
                <meta property="og:url" content="https://ktxcomay.com.vn/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content={`${tagInfo?.tagName} - KTX Cỏ May`}
                />
                <meta
                    name="twitter:description"
                    content="KTX Cỏ May có diện tích rộng hơn 2.600 m2, thiết kế 4 tầng hiện đại, khang trang. Đó là tâm nguyện của một Doanh nhân người Nam Bộ đã viết nên nhiều câu chuyện, nhiều mảnh đời qua các thế hệ sinh viên trên cả nước, học tập và sinh sống tại TP.HCM."
                />
                <meta name="twitter:image" content="%PUBLIC_URL%/image.jpeg" />
                <meta name="author" content="Ký Túc Xá Cỏ May" />
                <meta
                    name="apple-mobile-web-app-title"
                    content={`${tagInfo?.tagName} - KTX Cỏ May`}
                />
                <meta name="application-name" content="Ký Túc Xá Cỏ May" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="theme-color" content="#ffffff" />
            </Helmet>
            <Wrapper>
                <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 text-neutral-900 dark:text-neutral-50 mt-5">
                    <div className="text-center w-full max-w-2xl mx-auto ">
                        <h2 className="text-3xl md:text-4xl font-semibold">
                            {tagInfo?.tagName.toUpperCase()}
                        </h2>
                    </div>
                </div>
                {postList && postList.length > 0 ? (
                    <>
                        <InfiniteScroll
                            dataLength={postList.length}
                            next={loadMorePosts}
                            hasMore={hasMore}
                            loader={<h4>Đang tải thêm...</h4>}
                            className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {renderCardList()}
                        </InfiniteScroll>
                    </>
                ) : (
                    <div className="flex mt-20 justify-center items-center">
                        <div className="text-center">Trống</div>
                    </div>
                )}
            </Wrapper>
        </>
    )
}

export default trackWindowScroll(PostsHome)
