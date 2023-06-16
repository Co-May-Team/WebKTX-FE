import moment from "moment"
import { useState } from "react"
import { Fade } from "react-reveal"
import { NavLink } from "react-router-dom"
import Motion from "~/components/Motion"
import SavePostButton from "~/components/SavePostButton"
import SeoHelmet from "~/components/SeoHelmet"
import convertToUrl from "~/utils/commons/convertToUrl"

export default function PostSavedPage() {
  const [savedPosts, setSavedPosts] = useState(
    JSON.parse(localStorage.getItem("savedPosts"))
  )
  return (
    <Motion>
      <SeoHelmet title='Bài viết đã lưu' />
      <div className='container py-10 lg:py-16'>
        <div className='relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 text-neutral-900 dark:text-neutral-50'>
          <div className='text-center w-full max-w-2xl mx-auto '>
            <h2 className='text-3xl md:text-4xl font-semibold uppercase'>
              Bài viết đã lưu
            </h2>
          </div>
        </div>
        {savedPosts && savedPosts.length > 0 ? (
          <div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10'
            style={{ overflow: "visible" }}
          >
            {savedPosts?.map((savedPost) => (
              <Fade key={savedPost.postId} bottom>
                <div className='relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] h-full'>
                  <div className='block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden aspect-w-4 aspect-h-3'>
                    <div>
                      <div className='relative w-full h-full '>
                        <div className='absolute inset-0'>
                          <img
                            src={savedPost.thumbnail}
                            className='object-cover w-full h-full'
                            alt={savedPost.title}
                          />
                        </div>
                        <NavLink
                          className='block absolute inset-0'
                          to={`/${convertToUrl(savedPost?.title)}/${
                            savedPost?.postId
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <NavLink
                    className='absolute inset-0'
                    to={`/${convertToUrl(savedPost?.title)}/${
                      savedPost?.postId
                    }`}
                  />
                  <span className='absolute top-3 inset-x-3 z-10'>
                    <div className='flex flex-wrap space-x-2'>
                      <div className='transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-yellow-800 bg-yellow-100 hover:bg-yellow-800'>
                        {savedPost?.category?.categoryName}
                      </div>
                    </div>
                  </span>
                  <div className='p-4 flex flex-col flex-grow space-y-3'>
                    <div className='inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 text-xs leading-none'>
                      <div className='relative flex items-center space-x-2'>
                        <div className='wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white dark:ring-neutral-900'>
                          <img
                            className='absolute inset-0 w-full h-full object-cover'
                            src={savedPost?.userInfo.avatar}
                            alt={savedPost?.userInfo.fullName}
                            title={savedPost?.userInfo.fullName}
                          />
                          <span className='wil-avatar__name'>
                            {savedPost?.userInfo.fullName}
                          </span>
                        </div>
                        <span className='block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium'>
                          {savedPost?.userInfo.fullName}
                        </span>
                      </div>
                      <span className='text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium'>
                        ·
                      </span>
                      <span className='text-neutral-500 dark:text-neutral-400 font-normal'>
                        {moment(savedPost?.publishedAt).format("lll")}
                      </span>
                    </div>
                    <h2 className='nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 '>
                      <NavLink
                        className='line-clamp-2'
                        title={savedPost?.title}
                        to={`/${convertToUrl(savedPost?.title)}/${
                          savedPost?.postId
                        }`}
                      >
                        {savedPost.title}
                      </NavLink>
                    </h2>
                    <div className='flex items-end justify-between mt-auto'>
                      <div className='flex items-center space-x-2 relative'>
                        {/* <button
                          className='relative min-w-[68px] flex items-center justify-center rounded-full leading-none group transition-colors px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50 dark:bg-rose-100'
                          title='Lượt xem'
                        >
                          <FaEye size={15} />
                          <span className='ml-1 text-rose-600'>
                            {savedPost.viewed}
                          </span>
                        </button>
                        <NavLink
                          className='nc-PostCardCommentBtn relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden sm:flex  px-3 h-8 text-xs focus:outline-none'
                          title='Bình luận'
                          to={`/${convertToUrl(savedPost?.title)}/${
                            savedPost?.postId
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
                        </NavLink> */}
                      </div>
                      <div className='flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 relative'>
                        <SavePostButton
                          onClick={(newSavedPost) =>
                            setSavedPosts(newSavedPost)
                          }
                          savedPost={savedPost}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        ) : (
          <div className='flex mt-5 justify-center items-center'>
            <div className='text-center'>Chưa có bài viết nào được lưu...</div>
          </div>
        )}
      </div>
    </Motion>
  )
}
