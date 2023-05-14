/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment"
import { useEffect, useState } from "react"
import { FaEye } from "react-icons/fa"
import InfiniteScroll from "react-infinite-scroll-component"
import { useSelector } from "react-redux"
import { Fade } from "react-reveal"
import { NavLink, useParams } from "react-router-dom"
import Loading from "~/components/Loading"
import Motion from "~/components/Motion"
import SavePostButton from "~/components/SavePostButton"
import SeoHelmet from "~/components/SeoHelmet"
import postsApi from "~/services/postsApi"
import { tagsSelector } from "~/store/selectors"
import convertToUrl from "~/utils/commons/convertToUrl"
import readingTime from "~/utils/commons/readingTime"

export default function PostsHome() {
  const tagList = useSelector(tagsSelector).tags

  const url = useParams().url

  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [postList, setPostList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [tagInfo, setTagInfo] = useState(null)
  const [filters, setFilters] = useState({
    tag_id: tagList.filter((tag) => convertToUrl(tag?.tagName) === url)[0]
      .tagId,
  })

  const searchTagByUrl = () => {
    return tagList.filter((tag) => convertToUrl(tag?.tagName) === url)[0]
  }
  const loadMorePosts = async () => {
    setLoadingMore(true)
    await postsApi.getAll({ page: page + 1 }, filters).then((response) => {
      setPostList([...postList, ...response.data.data.posts])
      setPage(page + 1)
      if (response.data.data.posts.length === 0) {
        setHasMore(false)
      }
      setLoadingMore(false)
    })
  }
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

  return (
    <Motion className='container py-10 lg:py-16'>
      <SeoHelmet title={tagInfo?.tagName} />
      <div className='relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 text-neutral-900 dark:text-neutral-50'>
        <div className='text-center w-full max-w-2xl mx-auto '>
          <h2 className='text-3xl md:text-4xl font-semibold'>
            {tagInfo?.tagName.toUpperCase()}
          </h2>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : postList && postList.length > 0 ? (
        <>
          <InfiniteScroll
            dataLength={postList.length}
            next={loadMorePosts}
            hasMore={hasMore}
            className='grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            style={{ overflow: "visible" }}
          >
            {postList.map((post) => (
              <Fade bottom key={post?.postId}>
                <div className='relative flex flex-col group rounded-3xl overflow-hidden z-0 h-full'>
                  <div className='absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300'>
                    <div className='flex items-center space-x-2 relative'>
                      <button
                        className='relative min-w-[68px] flex items-center justify-center rounded-full leading-none group transition-colors px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-100 hover:text-rose-600 dark:hover:text-rose-500'
                        title='Lượt xem'
                      >
                        <FaEye size={15} />
                        <span className='ml-1'>{post?.viewed}</span>
                      </button>
                      <NavLink
                        className='relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden xs:flex  px-3 h-8 text-xs focus:outline-none'
                        title='Bình luận'
                        to={`/${convertToUrl(post?.title)}/${
                          post?.postId
                        }#binh-luan`}
                      >
                        <svg
                          width={24}
                          height={24}
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={1}
                            d='M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V14.25C19.25 15.3546 18.3546 16.25 17.25 16.25H14.625L12 19.25L9.375 16.25H6.75C5.64543 16.25 4.75 15.3546 4.75 14.25V6.75Z'
                          />
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9.5 11C9.5 11.2761 9.27614 11.5 9 11.5C8.72386 11.5 8.5 11.2761 8.5 11C8.5 10.7239 8.72386 10.5 9 10.5C9.27614 10.5 9.5 10.7239 9.5 11Z'
                          />
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12.5 11C12.5 11.2761 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.2761 11.5 11C11.5 10.7239 11.7239 10.5 12 10.5C12.2761 10.5 12.5 10.7239 12.5 11Z'
                          />
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.5 11C15.5 11.2761 15.2761 11.5 15 11.5C14.7239 11.5 14.5 11.2761 14.5 11C14.5 10.7239 14.7239 10.5 15 10.5C15.2761 10.5 15.5 10.7239 15.5 11Z'
                          />
                        </svg>
                        <span className='ml-1'>0</span>
                      </NavLink>
                    </div>
                    <div className='flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 relative'>
                      <SavePostButton savedPost={post} />
                    </div>
                  </div>
                  <NavLink
                    className='flex items-start relative w-full aspect-w-5 aspect-h-5'
                    to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                  >
                    <div className='absolute inset-0 overflow-hidden'>
                      <img
                        src={post?.thumbnail}
                        className='object-cover w-full h-full rounded-3xl '
                        alt={post?.title}
                        title={post?.title}
                      />
                    </div>
                    <div className='absolute top-3 left-3 group-hover:hidden' />
                    <span className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </NavLink>
                  <div className='absolute bottom-3 inset-x-3 p-4 bg-white dark:bg-neutral-900 flex flex-col flex-grow rounded-3xl group-hover:shadow-2xl transition-shadow'>
                    <NavLink
                      className='absolute inset-0'
                      to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                    />
                    <div className='space-y-2.5 mb-3'>
                      <div className='flex flex-wrap space-x-2'>
                        <div className='transition-colors hover:text-white duration-300 inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-red-800 bg-red-100 hover:bg-red-800'>
                          {post?.category.categoryName}
                        </div>
                      </div>
                      <h2 className='block text-base font-semibold text-neutral-900 dark:text-neutral-100'>
                        <NavLink
                          className='line-clamp-2'
                          title={post?.title}
                          to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                        >
                          {post?.title}
                        </NavLink>
                      </h2>
                    </div>
                    <div className='relative inline-flex items-center'>
                      <div className='wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-base flex-shrink-0 mr-3'>
                        <img
                          className='absolute inset-0 w-full h-full object-cover'
                          src={post?.userInfo.avatar}
                          alt={post?.userInfo.fullName}
                          title={post?.userInfo.fullName}
                        />
                        <span className='wil-avatar__name'>
                          {post?.userInfo.fullName}
                        </span>
                      </div>
                      <div>
                        <h2 className='text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium'>
                          {post?.userInfo.fullName}
                        </h2>
                        <span className='flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400'>
                          <span>{moment(post?.publishedAt).format("lll")}</span>
                          <span className='hidden xs:inline mx-1 transition-opacity opacity-0 group-hover:opacity-100'>
                            ·
                          </span>
                          <span className='hidden xs:inline transition-opacity opacity-0 group-hover:opacity-100'>
                            {readingTime(post?.content)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </InfiniteScroll>
          {loadingMore && <Loading />}
        </>
      ) : (
        <div className='flex mt-5 justify-center items-center'>
          <div className='text-center'>Trống</div>
        </div>
      )}
    </Motion>
  )
}
