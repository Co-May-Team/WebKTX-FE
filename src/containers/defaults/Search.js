/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Fade } from 'react-reveal'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useClickOutside } from '~/hooks'
import postsApi from '~/services/postsApi'
import convertToUrl from '~/utils/commons/convertToUrl'
import { defaultAvatar } from '~/utils/constants/default'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filterDropdownRef = useRef()

  const [keyword, setKeyWord] = useState(searchParams.get('tu-khoa'))
  const [filters, setFilters] = useState({
    sort: 'publishedAt',
    order: 'desc',
    filterBy: 'title',
  })
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [results, setResults] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [totalResult, setTotalResult] = useState(0)
  const [visibleFilterDropdown, setVisibleFilterDropdown] = useState(false)

  const loadMorePosts = async () => {
    setLoadingMore(true)
    await postsApi
      .getAll({ page: page + 1, sort: filters.sort, order: "desc" }, { [filters.filterBy]: keyword })
      .then((response) => {
        setResults([...results, ...response.data.data.posts])
        setTotalResult(response.data.data.pagination.totalItem)
        setPage(page + 1)
        if (response.data.data.posts.length === 0) {
          setHasMore(false)
        }
        setLoadingMore(false)
      })
  }

  useEffect(() => {
    document.title =
      searchParams.get('tu-khoa') === ''
        ? 'Tìm kiếm | KTX Cỏ May'
        : `Kết quả cho "${searchParams.get('tu-khoa')}" | KTX Cỏ May`
    setSearchParams({ 'tu-khoa': keyword })
    setLoading(true)
    postsApi.getAll({ page: 1, sort: filters.sort, order: "desc" }, { [filters.filterBy]: keyword }).then((response) => {
      setResults(response.data.data.posts)
      setTotalResult(response.data.data.pagination.totalItem)
      setPage(1)
      setLoading(false)
    })
  }, [filters])

  useClickOutside(filterDropdownRef, () => setVisibleFilterDropdown(false))

  return (
    <>
      <div className="px-2 pt-5 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-5 overflow-hidden ">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              className="object-cover w-full h-full"
              alt="nc-imgs"
            />
          </div>
        </div>
        <div className="relative container -mt-20 lg:-mt-48">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex items-center">
            <header className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
              <h2 className="text-2xl sm:text-4xl font-semibold">{keyword}</h2>
              <span className="block text-xs sm:text-sm mt-4 text-neutral-500 dark:text-neutral-300">
                Tìm thấy{' '}
                <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                  {totalResult}
                </strong>{' '}
                kết quả cho{' '}
                <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                  {keyword}
                </strong>
              </span>
              <form
                className="relative w-full mt-8 sm:mt-11 text-left"
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                <label
                  htmlFor="search-input"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  <span className="sr-only">Tìm kiếm</span>
                  <input
                    type="search"
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-full text-sm font-normal pl-14 py-5 pr-5 md:pl-16 "
                    id="search-input"
                    placeholder="Nhập từ khóa cần tìm..."
                    value={keyword}
                    onChange={(e) => setKeyWord(e.target.value)}
                  />
                  <button
                    className="flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 absolute right-2.5 top-1/2 transform -translate-y-1/2  w-11 h-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                    type="submit"
                  >
                    <i className="las la-arrow-right text-xl" />
                  </button>
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                    <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                      />
                    </svg>
                  </span>
                </label>
              </form>
            </header>
          </div>
        </div>
      </div>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <nav className="w-full overflow-x-auto hiddenScrollbar">
              <ul className="flex sm:space-x-2">
                <li className="relative">
                  <button
                    className={
                      filters.filterBy === 'title'
                        ? 'block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-secondary-900 text-secondary-50  focus:outline-none'
                        : 'block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none'
                    }
                    onClick={() =>
                      setFilters({ ...filters, filterBy: 'title' })
                    }
                  >
                    Theo tiêu đề
                  </button>
                </li>
                <li className="relative">
                  <button
                    className={
                      filters.filterBy === 'content'
                        ? 'block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-secondary-900 text-secondary-50  focus:outline-none'
                        : 'block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none'
                    }
                    onClick={() =>
                      setFilters({ ...filters, filterBy: 'content' })
                    }
                  >
                    Theo nội dung
                  </button>
                </li>
                <li className="relative">
                  <button
                    className={
                      filters.filterBy === 'q'
                        ? 'block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-secondary-900 text-secondary-50  focus:outline-none'
                        : 'block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none'
                    }
                    onClick={() => setFilters({ ...filters, filterBy: 'q' })}
                  >
                    Tất cả
                  </button>
                </li>
              </ul>
            </nav>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden" />
            <div className="flex justify-end">
              <div
                className="relative md:min-w-[200px]"
                ref={filterDropdownRef}
              >
                <button
                  className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm px-4 py-2 sm:py-2.5 hover:border-neutral-300 w-full justify-between text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                  onClick={() =>
                    setVisibleFilterDropdown(!visibleFilterDropdown)
                  }
                >
                  {filters.sort === 'publishedAt'
                    ? 'Gần đây nhất'
                    : filters.sort === 'viewed'
                    ? 'Xem nhiều nhất'
                    : 'Thảo luận nhiều nhất'}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {visibleFilterDropdown && (
                  <ul className="absolute right-0 w-52 py-1 mt-2 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-xl shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-700 z-50">
                    <li className="hover:text-primary-700 dark:text-neutral-200 hover:bg-primary-50 dark:bg-neutral-700 cursor-pointer relative py-2 pl-10 pr-4"
                    onClick={() => setFilters({...filters, sort: "publishedAt"})}
                    >
                      <span className="font-medium block truncate">
                        Gần đây nhất
                      </span>
                      {filters.sort === 'publishedAt' && (
                        <span className="text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            class="w-5 h-5"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      )}
                    </li>
                    <li className="hover:text-primary-700 dark:text-neutral-200 hover:bg-primary-50 dark:bg-neutral-700 cursor-pointer relative py-2 pl-10 pr-4"
                    onClick={() => setFilters({...filters, sort: "viewed"})}
                    >
                      <span className="font-normal block truncate">
                        Lượt xem nhiều nhất
                      </span>
                      {filters.sort === 'viewed' && (
                        <span className="text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            class="w-5 h-5"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      )}
                    </li>
                    <li className="hover:text-primary-700 dark:text-neutral-200 hover:bg-primary-50 dark:bg-neutral-700 cursor-pointer relative py-2 pl-10 pr-4"
                    onClick={() => setFilters({...filters, sort: "totalComment"})}
                    >
                      <span className="font-normal block truncate">
                        Thảo luận nhiều nhất
                      </span>
                      {filters.sort === 'totalComment' && (
                        <span className="text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            class="w-5 h-5"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      )}
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex mt-5 justify-center items-center">
              <div className="text-center">Đang tải dữ liệu...</div>
            </div>
          ) : results && results.length > 0 ? (
            <>
              <InfiniteScroll
                dataLength={results.length}
                next={loadMorePosts}
                hasMore={hasMore}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10"
                style={{ overflow: 'visible' }}
              >
                {results?.map((result) => (
                  <Fade bottom>
                    <div className="relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] h-full">
                      <div className="block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden aspect-w-4 aspect-h-3">
                        <div>
                          <div className="relative w-full h-full ">
                            <div className="absolute inset-0">
                              <img
                                src={result.thumbnail}
                                className="object-cover w-full h-full"
                                alt={result.title}
                              />
                            </div>
                            <NavLink
                              className="block absolute inset-0"
                              to={`/${convertToUrl(result.title)}/${
                                result.postId
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <NavLink
                        className="absolute inset-0"
                        to={`/${convertToUrl(result.title)}/${result.postId}`}
                      />
                      <span className="absolute top-3 inset-x-3 z-10">
                        <div className="flex flex-wrap space-x-2">
                          <div className="transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-yellow-800 bg-yellow-100 hover:bg-yellow-800">
                            {result.category.categoryName}
                          </div>
                        </div>
                      </span>
                      <div className="p-4 flex flex-col flex-grow space-y-3">
                        <div className="inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 text-xs leading-none">
                          <div className="relative flex items-center space-x-2">
                            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white dark:ring-neutral-900">
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
                            <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                              KTX Cỏ May
                            </span>
                          </div>
                          <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
                            ·
                          </span>
                          <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                            {moment(result.publishedAt).format('lll')}
                          </span>
                        </div>
                        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
                          <NavLink
                            className="line-clamp-2"
                            title={result.title}
                            to={`/${convertToUrl(result.title)}/${
                              result.postId
                            }`}
                          >
                            {result.title}
                          </NavLink>
                        </h2>
                        <div className="flex items-end justify-between mt-auto">
                          <div className="flex items-center space-x-2 relative">
                            <button
                              className="relative min-w-[68px] flex items-center justify-center rounded-full leading-none group transition-colors px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50 dark:bg-rose-100"
                              title="Lượt xem"
                            >
                              <FaEye size={15} />
                              <span className="ml-1 text-rose-600">
                                {result.viewed}
                              </span>
                            </button>
                            <NavLink
                              className="nc-PostCardCommentBtn relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden sm:flex  px-3 h-8 text-xs focus:outline-none"
                              title="Bình luận"
                              to={`/${convertToUrl(result.title)}/${
                                result.postId
                              }#binh-luan`}
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
                          <div className="flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 relative">
                            <button
                              className="relative rounded-full flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
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
                  </Fade>
                ))}
              </InfiniteScroll>
              {loadingMore && (
                <div className="flex mt-5 justify-center items-center">
                  <h4 className="text-center">Đang tải thêm...</h4>
                </div>
              )}
            </>
          ) : (
            <div className="flex mt-5 justify-center items-center">
              <div className="text-center">
                Không tìm thấy kết quả phù hợp...
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
