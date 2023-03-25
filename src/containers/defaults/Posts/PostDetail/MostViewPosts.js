import moment from 'moment'
import PropTypes from 'prop-types'
import { FaEye } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { Fade } from 'react-reveal'
import convertToUrl from '~/utils/commons/convertToUrl'
import SavePostButton from '~/components/SavePostButton'

function MostViewPosts({ listPost }) {
  return (
    <div className="container">
      <div>
        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 text-neutral-900 dark:text-neutral-50">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold">
            🎯 Bài viết phổ biến
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {listPost?.map((post) => (
          <Fade key={post.postId} bottom>
            <div
              className="relative flex flex-col group rounded-3xl overflow-hidden z-0 h-full"
            >
              <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
                <div className="flex items-center space-x-2 relative">
                  <button
                    className="relative min-w-[68px] flex items-center justify-center rounded-full leading-none group transition-colors px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-100 hover:text-rose-600 dark:hover:text-rose-500"
                    title="Lượt xem"
                  >
                    <FaEye size={15} />
                    <span className="ml-1 text-neutral-900 dark:text-neutral-200">
                      {post?.viewed}
                    </span>
                  </button>
                  <NavLink
                    className="relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden sm:flex  px-3 h-8 text-xs focus:outline-none"
                    title="Bình luận"
                    to={`/${convertToUrl(post?.title)}/${
                      post?.postId
                    }#binh-luan`}
                  >
                    <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
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
                <div className="flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 relative">
                        <SavePostButton savedPost={post} />
                </div>
              </div>
              <div className="flex items-start relative w-full aspect-w-3 aspect-h-3 sm:aspect-h-4" />
              <div className="absolute inset-0">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0">
                    <img
                      src={post?.thumbnail}
                      className="object-cover w-full h-full"
                      alt={post?.title}
                    />
                  </div>
                </div>
              </div>
              <NavLink
                className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
                to={`/${convertToUrl(post?.title)}/${post?.postId}`}
              />
              <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
                <NavLink
                  className="absolute inset-0"
                  to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                />
                <div className="mb-3">
                  <div className="flex flex-wrap space-x-2">
                    <div
                      className="transition-colors hover:text-white duration-300 inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-yellow-800 bg-yellow-100 hover:bg-yellow-800"
                      // to={`/${convertToUrl(post?.category.categoryName)}`}
                    >
                      {post?.category.categoryName}
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center text-xs text-neutral-300">
                  <div className="block ">
                    <h2 className="block text-lg font-semibold text-white ">
                      <span className="line-clamp-2" title={post?.title}>
                        {post?.title}
                      </span>
                    </h2>
                    <div className="flex mt-2.5 relative">
                      <span className="block text-neutral-200 hover:text-white font-medium truncate">
                        KTX Cỏ May
                      </span>
                      <span className="mx-[6px] font-medium">·</span>
                      <span className="font-normal truncate">
                        {moment(post?.publishedAt).format('lll')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div></Fade>
          ))}
        </div>
      </div>
    </div>
  )
}

MostViewPosts.propTypes = {
  listPost: PropTypes.array.isRequired,
}

export default MostViewPosts
