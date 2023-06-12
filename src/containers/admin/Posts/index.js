/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment"
import { useEffect, useRef, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux"
import { Fade } from "react-reveal"
import { NavLink } from "react-router-dom"
import Confirm from "~/components/Customs/Confirm"
import Loading from "~/components/Loading"
import Motion from "~/components/Motion"
import SavePostButton from "~/components/SavePostButton"
import { useClickOutside } from "~/hooks"
import {
  deletePost,
  fetchHiddenPosts,
  fetchPosts,
  loadMoreHiddenPosts,
  loadMorePosts,
} from "~/store/posts/actions"
import { postsSelector } from "~/store/selectors"
import convertToUrl from "~/utils/commons/convertToUrl"
import SubmitPost from "./SubmitPost"

export default function Posts() {
  const posts = useSelector(postsSelector).posts
  const pagination = useSelector(postsSelector).pagination
  const status = useSelector(postsSelector).status

  const dispatch = useDispatch()

  const filterDropdownRef = useRef()

  const [keyword, setKeyWord] = useState("")
  const [params, setParams] = useState({
    page: 1,
    sort: "publishedAt",
    order: "desc",
  })
  const [filters, setFilters] = useState({
    title: "",
  })
  const [visibleFilterDropdown, setVisibleFilterDropdown] = useState(false)
  const [visibleSubmitPost, setVisibleSubmitPost] = useState(false)
  const [visibleFormEditPost, setVisibleFormEditPost] = useState(false)
  const [visibleDeletePost, setVisibleDeletePost] = useState(false)
  const [currentPost, setCurrentPost] = useState(null)
  const [visibleHiddenPosts, setVisibleHiddenPosts] = useState(false)

  const handleSearch = async (e) => {
    const value = e.target.value
    setKeyWord(value)
    if (visibleHiddenPosts) {
      if (filters.title !== undefined && filters.content === undefined) {
        dispatch(fetchHiddenPosts({ params, filters: { title: value } }))
      } else if (filters.content !== undefined && filters.title === undefined) {
        dispatch(fetchHiddenPosts({ params, filters: { content: value } }))
      } else {
        dispatch(
          fetchHiddenPosts({
            params,
            filters: { title: value, content: value },
          })
        )
      }
    } else {
      if (filters.title !== undefined && filters.content === undefined) {
        dispatch(fetchPosts({ params, filters: { title: value } }))
      } else if (filters.content !== undefined && filters.title === undefined) {
        dispatch(fetchPosts({ params, filters: { content: value } }))
      } else {
        dispatch(
          fetchPosts({ params, filters: { title: value, content: value } })
        )
      }
    }
  }

  const handleDeletePost = () => {
    dispatch(deletePost(currentPost?.postId))
  }

  useEffect(() => {
    if (visibleHiddenPosts) {
      if (filters.title !== undefined && filters.content === undefined) {
        dispatch(fetchHiddenPosts({ params, filters }))
      } else if (filters.content !== undefined && filters.title === undefined) {
        dispatch(fetchHiddenPosts({ params, filters }))
      } else {
        dispatch(fetchHiddenPosts({ params, filters }))
      }
    } else {
      if (filters.title !== undefined && filters.content === undefined) {
        dispatch(fetchPosts({ params, filters }))
      } else if (filters.content !== undefined && filters.title === undefined) {
        dispatch(fetchPosts({ params, filters }))
      } else {
        dispatch(fetchPosts({ params, filters }))
      }
    }
  }, [params, filters, visibleHiddenPosts])
  useClickOutside(filterDropdownRef, () => setVisibleFilterDropdown(false))

  return (
    <Motion className='relative container'>
      <div className='flex flex-col mb-8 relative'>
        <div className='relative flex flex-col items-center sm:flex-row justify-between mb-6 md:mb-8 text-neutral-900 dark:text-neutral-50'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl md:text-4xl font-semibold'>
              QUẢN LÝ BÀI VIẾT
            </h2>
            <span className='mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400'></span>
          </div>
          <button
            className='relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
            onClick={() => setVisibleSubmitPost(true)}
          >
            Đăng bài mới
          </button>
        </div>
        <div
          className='mb-3'
          style={{ cursor: "pointer" }}
          onClick={() => setVisibleHiddenPosts(!visibleHiddenPosts)}
        >
          <input
            type='checkbox'
            className='mr-2'
            checked={visibleHiddenPosts}
          />
          <span className='text-neutral-800 font-medium text-sm dark:text-neutral-300'>
            Chỉ hiển thị bài viết đã ẩn
          </span>
        </div>
        <form
          className='relative w-full text-left'
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <label className='text-neutral-500 dark:text-neutral-300'>
            <span className='sr-only'>Tìm kiếm</span>
            <input
              type='search'
              className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-full text-sm font-normal pl-14 py-5 pr-5 md:pl-16 '
              placeholder='Nhập từ khóa cần tìm...'
              value={keyword}
              onChange={handleSearch}
            />
            <button
              className='flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 absolute right-2.5 top-1/2 transform -translate-y-1/2  w-11 h-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
              type='submit'
            >
              <i className='las la-arrow-right text-xl' />
            </button>
            <span className='absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6'>
              <svg width={24} height={24} fill='none' viewBox='0 0 24 24'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z'
                />
              </svg>
            </span>
          </label>
        </form>
        <div className='flex flex-col sm:items-center sm:justify-between sm:flex-row mt-3'>
          <nav className='w-full overflow-x-auto hiddenScrollbar'>
            <ul className='flex sm:space-x-2'>
              <li className='relative'>
                <button
                  className={
                    filters.title !== undefined && filters.content === undefined
                      ? "block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-secondary-900 text-secondary-50  focus:outline-none"
                      : "block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                  }
                  onClick={() => setFilters({ title: keyword })}
                >
                  Theo tiêu đề
                </button>
              </li>
              <li className='relative'>
                <button
                  className={
                    filters.content !== undefined && filters.title === undefined
                      ? "block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-secondary-900 text-secondary-50  focus:outline-none"
                      : "block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                  }
                  onClick={() => setFilters({ content: keyword })}
                >
                  Theo nội dung
                </button>
              </li>
              <li className='relative'>
                <button
                  className={
                    filters.title !== undefined && filters.content !== undefined
                      ? "block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-secondary-900 text-secondary-50  focus:outline-none"
                      : "block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                  }
                  onClick={() =>
                    setFilters({ title: keyword, content: keyword })
                  }
                >
                  Cả tiêu đề và nội dung
                </button>
              </li>
            </ul>
          </nav>
          <div className='block my-4 border-b w-full border-neutral-100 sm:hidden' />
          {/* <div className='flex justify-end'>
            <div className='relative md:min-w-[200px]' ref={filterDropdownRef}>
              <button
                className='relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm px-4 py-2 sm:py-2.5 hover:border-neutral-300 w-full justify-between text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                onClick={() => setVisibleFilterDropdown(!visibleFilterDropdown)}
              >
                {params.sort === "publishedAt"
                  ? "Gần đây nhất"
                  : params.sort === "viewed"
                  ? "Xem nhiều nhất"
                  : "Thảo luận nhiều nhất"}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-4 ml-2 -mr-1 opacity-70'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              {visibleFilterDropdown && (
                <ul className='absolute right-0 w-52 py-1 mt-2 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-xl shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-700 z-50'>
                  <li
                    className='hover:text-primary-700 dark:text-neutral-200 hover:bg-primary-50 dark:bg-neutral-700 cursor-pointer relative py-2 pl-10 pr-4'
                    onClick={() =>
                      setParams({ ...params, sort: "publishedAt" })
                    }
                  >
                    <span className='font-medium block truncate'>
                      Gần đây nhất
                    </span>
                    {params.sort === "publishedAt" && (
                      <span className='text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                          className='w-5 h-5'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </span>
                    )}
                  </li>
                  <li
                    className='hover:text-primary-700 dark:text-neutral-200 hover:bg-primary-50 dark:bg-neutral-700 cursor-pointer relative py-2 pl-10 pr-4'
                    onClick={() => setParams({ ...params, sort: "viewed" })}
                  >
                    <span className='font-normal block truncate'>
                      Lượt xem nhiều nhất
                    </span>
                    {params.sort === "viewed" && (
                      <span className='text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                          className='w-5 h-5'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </span>
                    )}
                  </li>
                  <li
                    className='hover:text-primary-700 dark:text-neutral-200 hover:bg-primary-50 dark:bg-neutral-700 cursor-pointer relative py-2 pl-10 pr-4'
                    onClick={() =>
                      setParams({ ...params, sort: "totalComment" })
                    }
                  >
                    <span className='font-normal block truncate'>
                      Thảo luận nhiều nhất
                    </span>
                    {filters.sort === "totalComment" && (
                      <span className='text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                          className='w-5 h-5'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </span>
                    )}
                  </li>
                </ul>
              )}
            </div>
          </div> */}
        </div>
        {status === "loading" ? (
          <Loading />
        ) : posts && posts.length > 0 ? (
          <>
            <InfiniteScroll
              dataLength={posts.length}
              next={() => {
                if (visibleHiddenPosts) {
                  dispatch(
                    loadMoreHiddenPosts({
                      params: { ...params, page: pagination.page + 1 },
                      filters,
                    })
                  )
                }
                else {
                dispatch(
                  loadMorePosts({
                    params: { ...params, page: pagination.page + 1 },
                    filters,
                  })
                )
                }
              }}
              hasMore={status !== "loadingFull"}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10'
              style={{ overflow: "visible" }}
            >
              {posts?.map((post) => (
                <Fade key={post?.postId} bottom>
                  <div className='relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] h-full'>
                    <div className='block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden aspect-w-4 aspect-h-3'>
                      <div>
                        <div className='relative w-full h-full '>
                          <div className='absolute inset-0'>
                            <img
                              src={post?.thumbnail}
                              className='object-cover w-full h-full'
                              alt={post?.title}
                            />
                          </div>
                          <NavLink
                            className='block absolute inset-0'
                            to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                          />
                        </div>
                      </div>
                    </div>
                    <NavLink
                      className='absolute inset-0'
                      to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                    />
                    <span className='absolute top-3 inset-x-3 z-10'>
                      <div className='flex flex-wrap space-x-2'>
                        <div className='transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-yellow-800 bg-yellow-100 hover:bg-yellow-800'>
                          {post?.category?.categoryName}
                        </div>
                      </div>
                    </span>
                    <div className='p-4 flex flex-col flex-grow space-y-3'>
                      <div className='inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 text-xs leading-none'>
                        <div className='relative flex items-center space-x-2'>
                          <div className='wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white dark:ring-neutral-900'>
                            <img
                              className='absolute inset-0 w-full h-full object-cover'
                              src={post?.userInfo?.avatar}
                              alt={post?.userInfo?.fullName}
                              title={post?.userInfo?.fullName}
                            />
                            <span className='wil-avatar__name'>
                              {post?.userInfo?.fullName}
                            </span>
                          </div>
                          <span className='block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium'>
                            {post?.userInfo?.fullName}
                          </span>
                        </div>
                        <span className='text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium'>
                          ·
                        </span>
                        <span className='text-neutral-500 dark:text-neutral-400 font-normal'>
                          {moment(post?.publishedAt).format("lll")}
                        </span>
                      </div>
                      <h2 className='nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 '>
                        <NavLink
                          className='line-clamp-2'
                          title={post?.title}
                          to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                        >
                          {post?.title}
                        </NavLink>
                      </h2>
                      <div className='flex items-end justify-between mt-auto'>
                        <div className='flex items-center space-x-2 relative'>
                          <button
                            className='relative flex items-center justify-center rounded-full leading-none group transition-colors px-3 h-8 text-xs focus:outline-none text-yellow-600 bg-yellow-50 hover:bg-rose-50 dark:bg-rose-100'
                            title='Chỉnh sửa bài viết'
                            onClick={() => {
                              setVisibleFormEditPost(true)
                              setCurrentPost(post)
                            }}
                          >
                            <FaEdit size={15} />
                          </button>
                          <button
                            className='relative items-center rounded-full text-rose-600 transition-colors  dark:bg-neutral-800 hover:bg-rose-50 dark:bg-rose-100 hover:text-rose-600 dark:text-rose-500 hidden sm:flex  px-3 h-8 text-xs focus:outline-none'
                            title='Xóa'
                            onClick={() => {
                              setVisibleDeletePost(true)
                              setCurrentPost(post)
                            }}
                          >
                            <FaTrash size={15} />
                          </button>
                        </div>
                        <div className='flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 relative'>
                          <SavePostButton savedPost={post} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </InfiniteScroll>
            {status === "loadingMore" && <Loading />}
          </>
        ) : (
          <div className='flex mt-5 justify-center items-center'>
            <div className='text-center'>Không tìm thấy kết quả phù hợp...</div>
          </div>
        )}
      </div>
      {visibleSubmitPost && (
        <SubmitPost
          visible={visibleSubmitPost}
          setVisible={() => setVisibleSubmitPost(!visibleSubmitPost)}
        />
      )}
      {visibleFormEditPost && (
        <SubmitPost
          visible={visibleFormEditPost}
          setVisible={() => setVisibleFormEditPost(!visibleFormEditPost)}
          post={currentPost}
        />
      )}
      {visibleDeletePost && (
        <Confirm
          visible={visibleDeletePost}
          setVisible={() => setVisibleDeletePost(!visibleDeletePost)}
          title='Xóa bài viết'
          content='Bạn có chắc muốn xóa bài viết này?'
          onConfirm={handleDeletePost}
        />
      )}
    </Motion>
  )
}
