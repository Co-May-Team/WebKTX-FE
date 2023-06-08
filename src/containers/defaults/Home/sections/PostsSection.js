/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment"
import { useEffect, useState } from "react"
import { FaEye } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Fade } from "react-reveal"
import { NavLink } from "react-router-dom"
import Loading from "~/components/Loading"
import SavePostButton from "~/components/SavePostButton"
import { fetchPosts, loadMorePosts } from "~/store/posts/actions"
import { postsSelector } from "~/store/selectors"
import convertToUrl from "~/utils/commons/convertToUrl"
import readingTime from "~/utils/commons/readingTime"

export default function PostsSection() {
  const posts = useSelector(postsSelector).posts
  const status = useSelector(postsSelector).status

  const dispatch = useDispatch()

  const [params, setParams] = useState({
    page: 1,
  })

  useEffect(() => {
    if (params.page === 1) {
      dispatch(fetchPosts({ params, filters: {} }))
    } else {
      dispatch(loadMorePosts({ params, filters: {} }))
    }
  }, [params])

  return (
    <div id='posts-section' className='container py-10 lg:py-16'>
      <div className='grid grid-cols-1 lg:grid-cols-1 gap-6 md:gap-8'>
        {status === "loading" ? (
          <Loading />
        ) : (
          <>
            <div className='relative flex flex-col-reverse md:flex-row justify-end '>
              <div className='md:absolute z-10 md:left-0 md:top-1/2 md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-1/2 xl:w-2/5'>
                <Fade left>
                  <div className='p-4 sm:p-8 xl:py-14 md:px-10 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg shadow-lg rounded-3xl space-y-3 sm:space-y-5 !border-opacity-0 -- nc-dark-box-bg'>
                    <div className='flex flex-wrap space-x-2'>
                      <div
                        className='transition-colors hover:text-white duration-300 inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-yellow-800 bg-yellow-100 hover:bg-yellow-800'
                        // to={`/${convertToUrl(posts[0]?.category.categoryName)}`}
                      >
                        {posts[0]?.category?.categoryName}
                      </div>
                    </div>
                    <h2 className='nc-card-title text-xl sm:text-2xl font-semibold '>
                      <NavLink
                        className='line-clamp-2'
                        title={posts[0]?.title}
                        to={`/${convertToUrl(posts[0]?.title)}/${
                          posts[0]?.postId
                        }`}
                      >
                        {posts[0]?.title}
                      </NavLink>
                    </h2>
                    <div className='hidden sm:block sm:mt-2'>
                      <span className='text-neutral-500 dark:text-neutral-400 text-base line-clamp-1'>
                        {posts[0]?.summary}
                      </span>
                    </div>
                    <NavLink
                      className='relative inline-flex items-center relative'
                      to={`/${convertToUrl(posts[0]?.title)}/${
                        posts[0]?.postId
                      }`}
                    >
                      <div className='wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-base flex-shrink-0 mr-3'>
                        <img
                          className='absolute inset-0 w-full h-full object-cover'
                          src={posts[0]?.userInfo?.avatar}
                          alt={posts[0]?.userInfo?.fullName}
                          title={posts[0]?.userInfo?.fullName}
                        />
                        <span className='wil-avatar__name'>
                          {posts[0]?.userInfo?.fullName}
                        </span>
                      </div>
                      <div>
                        <h2 className='text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium'>
                          {posts[0]?.userInfo?.fullName}
                        </h2>
                        <span className='flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400'>
                          <span>
                            {"Vào " +
                              moment(posts[0]?.publishedAt).format("LLLL")}
                          </span>
                        </span>
                      </div>
                    </NavLink>
                    <div className='flex items-center justify-between mt-3'>
                      <div className='flex items-center space-x-2'>
                        <button
                          className='relative min-w-[68px] flex items-center justify-center rounded-full leading-none group transition-colors px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50 dark:bg-rose-100'
                          title='Lượt xem'
                        >
                          <FaEye size={15} />
                          <span className='ml-1 text-rose-600'>
                            {posts[0]?.viewed}
                          </span>
                        </button>
                        <NavLink
                          className='relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden sm:flex  px-3 h-8 text-xs focus:outline-none'
                          title='Bình luận'
                          to={`/${convertToUrl(posts[0]?.title)}/${
                            posts[0]?.postId
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
                          <span className='ml-1 text-neutral-900 dark:text-neutral-200'>
                            0
                          </span>
                        </NavLink>
                      </div>
                      <div className='flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300'>
                        <span>{readingTime(posts[0]?.content)}</span>
                        <SavePostButton savedPost={posts[0]} />
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
              <div className='w-full md:w-4/5 lg:w-2/3'>
                <NavLink
                  className='block relative'
                  to={`/${convertToUrl(posts[0]?.title)}/${posts[0]?.postId}`}
                >
                  <Fade right>
                    <div className='aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative animate__animated animate__zoomIn animate__faster'>
                      <img
                        src={posts[0]?.thumbnail}
                        className='absolute inset-0 object-cover rounded-3xl'
                        alt={posts[0]?.title}
                        title={posts[0]?.title}
                      />
                    </div>
                  </Fade>
                  <div className='absolute w-8 h-8 md:w-10 md:h-10 right-6 top-6' />
                </NavLink>
              </div>
            </div>
            {posts?.slice(1, posts?.length).map((post) => (
              <Fade bottom key={post?.postId}>
                <div className='relative flex group flex-col-reverse sm:flex-row sm:items-center p-4 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] h-full'>
                  <NavLink
                    className='absolute inset-0 z-0'
                    to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                  ></NavLink>
                  <div className='flex flex-col flex-grow'>
                    <div className='space-y-3 mb-4'>
                      <div className='flex flex-wrap space-x-2'>
                        <div
                          className='transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-red-800 bg-red-100 hover:bg-red-800'
                          // to={`/${convertToUrl(posts[0]?.category.categoryName)}`}
                        >
                          {post?.category?.categoryName}
                        </div>
                      </div>
                      <h2 className='block font-semibold text-base'>
                        <NavLink
                          className='line-clamp-2'
                          title={post?.title}
                          to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                        >
                          {post?.title}
                        </NavLink>
                      </h2>
                      <div className='hidden sm:block sm:mt-2'>
                        <span className='text-neutral-500 dark:text-neutral-400 text-base line-clamp-1'>
                          {post?.summary}
                        </span>
                      </div>
                    </div>
                    <div className='flex items-center flex-wrap justify-between mt-auto'>
                      <div className='flex items-center space-x-2 relative'>
                        <button
                          className='relative min-w-[68px] flex items-center justify-center rounded-full leading-none group transition-colors hidden sm:flex px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50 dark:bg-rose-100'
                          title='Lượt xem'
                        >
                          <FaEye size={15} />
                          <span className='ml-1 text-rose-600'>
                            {post?.viewed}
                          </span>
                        </button>
                        <NavLink
                          className='relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden sm:flex px-3 h-8 text-xs focus:outline-none'
                          title='Bình luận'
                          to={`/${convertToUrl(post?.title)}/${
                            post?.postId
                          }#binh-luan`}
                        >
                          <svg
                            width='24'
                            height='24'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1'
                              d='M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V14.25C19.25 15.3546 18.3546 16.25 17.25 16.25H14.625L12 19.25L9.375 16.25H6.75C5.64543 16.25 4.75 15.3546 4.75 14.25V6.75Z'
                            ></path>
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M9.5 11C9.5 11.2761 9.27614 11.5 9 11.5C8.72386 11.5 8.5 11.2761 8.5 11C8.5 10.7239 8.72386 10.5 9 10.5C9.27614 10.5 9.5 10.7239 9.5 11Z'
                            ></path>
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M12.5 11C12.5 11.2761 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.2761 11.5 11C11.5 10.7239 11.7239 10.5 12 10.5C12.2761 10.5 12.5 10.7239 12.5 11Z'
                            ></path>
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.5 11C15.5 11.2761 15.2761 11.5 15 11.5C14.7239 11.5 14.5 11.2761 14.5 11C14.5 10.7239 14.7239 10.5 15 10.5C15.2761 10.5 15.5 10.7239 15.5 11Z'
                            ></path>
                          </svg>
                          <span className='ml-1 text-neutral-900 dark:text-neutral-200'>
                            0
                          </span>
                        </NavLink>
                        <span className='flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400'>
                          <span>
                            {"Vào " + moment(post?.publishedAt).format("LLLL")}
                          </span>
                        </span>
                      </div>
                      <div className='flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 relative'>
                        <span>{readingTime(post?.content)}</span>
                        <SavePostButton savedPost={post} />
                      </div>
                    </div>
                  </div>
                  <NavLink
                    className='block relative flex-shrink-0 w-full sm:w-40 h-40 sm:h-full sm:ml-5 rounded-2xl overflow-hidden sm:mb-0 mb-3'
                    to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                  >
                    <div className='absolute inset-0'>
                      <img
                        src={post?.thumbnail}
                        className='object-cover w-full h-full'
                        alt={post?.title}
                        title={post?.title}
                      />
                    </div>
                    <span className='absolute bottom-1 left-1'></span>
                  </NavLink>
                </div>
              </Fade>
            ))}
          </>
        )}
      </div>
      <div className='flex flex-col mt-10  justify-center items-center gap-3'>
        {status === "loadingMore" && <Loading />}
        <button
          className='relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
          disabled={status === "loadingMore"}
          onClick={() =>
            setParams((prevParams) => {
              return { page: prevParams.page + 1 }
            })
          }
        >
          Xem thêm
        </button>
      </div>
    </div>
  )
}
