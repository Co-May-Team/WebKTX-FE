import moment from "moment"
import { Fade } from "react-reveal"
import { NavLink } from "react-router-dom"
import convertToUrl from "~/utils/commons/convertToUrl"

export default function RelatedPosts({ listPost }) {
  return (
    <div className='rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800'>
      <div className='flex items-center justify-between p-4 xl:p-5 border-b border-neutral-200 dark:border-neutral-700 '>
        <h2 className='text-lg text-neutral-900 dark:text-neutral-100 font-semibold flex-grow'>
          Bài viết liên quan
        </h2>
        {/* <NavLink
                        className="flex-shrink-0 block text-primary-700 dark:text-primary-500 font-semibold text-sm"
                        rel="noopener noreferrer"
                        to="/bai-viet-xem-nhieu"
                    >
                        Xem tất cả
                    </NavLink> */}
      </div>
      <div className='flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700'>
        {listPost?.map((post) => (
          <Fade key={post?.postId} bottom>
            <div className='relative flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center p-4 xl:px-5 xl:py-4 hover:bg-neutral-200 dark:hover:bg-neutral-700'>
              <NavLink
                className='absolute inset-0'
                title={post?.title}
                to={`/${convertToUrl(post?.title)}/${post?.postId}`}
              />
              <div className='relative space-y-3'>
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
                    {moment(post?.publishedAt).format("ll")}
                  </span>
                </div>
                <h2 className='nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100'>
                  <NavLink
                    className='line-clamp-2'
                    title={post?.title}
                    to={`/${convertToUrl(post?.title)}/${post?.postId}`}
                  >
                    {post?.title}
                  </NavLink>
                </h2>
              </div>
              <NavLink
                className='block sm:w-20 flex-shrink-0 relative rounded-lg overflow-hidden z-0 mb-3 sm:ml-4 sm:mb-0 group'
                title={post?.title}
                to={`/${convertToUrl(post?.title)}/${post?.postId}`}
              >
                <div className='w-full h-0 aspect-w-16 aspect-h-9 sm:aspect-h-16'>
                  <div className='absolute inset-0'>
                    <img
                      src={post?.thumbnail}
                      className='z-0 object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300'
                      alt={post?.title}
                      title={post?.title}
                    />
                  </div>
                </div>
              </NavLink>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  )
}
