/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, loadMorePosts } from '~/store/posts/actions'
import { categoriesSelector, postsSelector } from '~/store/selectors'
import ListPost from './ListPost'
import SubmitPost from './SubmitPost'

function Posts() {
  const categories = useSelector(categoriesSelector).categories
  const posts = useSelector(postsSelector).posts
  const status = useSelector(postsSelector).status

  const dispatch = useDispatch()

  const [params, setParams] = useState({
    page: 1,
  })

  const [visibleSubmitPost, setVisibleSubmitPost] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
  })

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage,
    })
  }

  useEffect(() => {
    if (params.page === 1) {
      dispatch(fetchPosts({ params, filters: {} }))
    }
    else {
      dispatch(loadMorePosts({ params, filters: {} }))
    }
  }, [params])

  return (
    <div className="relative">
      <div className="flex flex-col mb-8 relative">
        <div className="relative flex flex-col items-center sm:flex-row justify-between mb-6 md:mb-8 text-neutral-900 dark:text-neutral-50">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold">
              TẤT CẢ BÀI VIẾT
            </h2>
            <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400"></span>
          </div>
          <button
            className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
            onClick={() => setVisibleSubmitPost(true)}
          >
            Đăng bài mới
          </button>
        </div>
        {/* <div className="flex items-center justify-between">
          <nav className="relative flex w-full overflow-x-auto text-sm md:text-base">
            <ul className="flex sm:space-x-2">
              {categories.map((category) => (
                <li
                  key={category.categoryId}
                  className="relative"
                  onClick={() =>{
                    setParams({ page: 1 })
                    dispatch(
                      fetchPosts({
                        params: { page: 1 },
                        filters: { category_id: category.categoryId },
                      })
                    )
                  }}
                >
                  <button className="block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-secondary-900 text-secondary-50 focus:outline-none">
                    {category.categoryName}
                  </button>
                </li>
              ))}
              <li className="relative">
                <button className="block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none">
                  Design
                </button>
              </li>
            </ul>
          </nav>
          <span className="hidden sm:block flex-shrink-0">
            <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonSecondary font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 !leading-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
              <span>Tất cả</span>
            </button>
          </span>
        </div> */}
      </div>
      <ListPost data={posts} />
      <div className="flex flex-col mt-10 mb-10 justify-center items-center gap-3">
      {status === "loadingMore" && "Đang tải thêm bài viết..."}
        <button
          className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
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
      {visibleSubmitPost && (
        <SubmitPost
          visible={visibleSubmitPost}
          setVisible={() => setVisibleSubmitPost(!visibleSubmitPost)}
        />
      )}
    </div>
  )
}

export default Posts
