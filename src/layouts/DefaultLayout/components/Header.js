import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { LogoIcon } from '~/components/Icons'

import { useClickOutside } from '~/hooks'
import { fetchCategories } from '~/store/categories/actions'
import {
  authSelector,
  categoriesSelector,
  tagsSelector,
} from '~/store/selectors'
import { fetchTags } from '~/store/tags/actions'
import { path } from '~/utils'
import capitalizeWords from '~/utils/commons/capitalizeWords'
import convertToUrl from '~/utils/commons/convertToUrl'
import AvatarDropdown from './AvatarDropdown'

function Header() {
  const userInfo = useSelector(authSelector).userInfo
  const categories = useSelector(categoriesSelector).categories
  const tags = useSelector(tagsSelector).tags

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('isDarkMode') || false)
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [isShow, setShow] = useState(false)
  const sidebarRef = useRef()

  useEffect(() => {
    dispatch(fetchTags())
    dispatch(fetchCategories())
  }, [])
  useEffect(() => {
    const htmlElement = document.querySelector('html')
    const isDarkMode = localStorage.getItem('isDarkMode')
    const htmlClasses = htmlElement.className.split(' ')
    const newHtmlClasses = classNames(htmlClasses, {
      dark: isDarkMode === 'true',
    })
    htmlElement.className = newHtmlClasses
  }, [])

  const toggleDarkMode = () => {
    const htmlElement = document.querySelector('html')
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true'
    localStorage.setItem('isDarkMode', !isDarkMode)
    setDarkMode(!darkMode)
    if (htmlElement.classList.contains('dark') && isDarkMode) {
      htmlElement.classList.remove('dark')
    } else {
      htmlElement.classList.add('dark')
    }
  }

  useClickOutside(sidebarRef, () => setShow(!isShow))
  return (
    <div
      id="header-sticky"
      className="sticky top-0 w-full left-0 right-0 z-40 transition-all"
      style={{ top: '-72px' }}
    >
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-b dark:border-neutral-700 !border-transparent shadow-lg">
        <div className="relative z-10 py-3">
          <div className="container relative flex justify-between items-center space-x-4 xl:space-x-8">
            <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
              <NavLink className="flex items-center justify-center" to="/">
                <LogoIcon />
              </NavLink>
              {window.location.pathname !== '/tim-kiem' && (
                <div className="hidden sm:block flex-grow max-w-xs">
                  <div className="relative">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        navigate(`${path.SEARCH}?tu-khoa=${searchTerm}`)
                      }}
                    >
                      <input
                        type="search"
                        className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-full text-sm font-normal h-[42px] pl-4 py-3 pr-10 w-full"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500 dark:text-neutral-400">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 22L20 20"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <input
                        type="submit"
                        onSubmit={(e) => {
                          e.preventDefault()
                          navigate(`${path.SEARCH}?tu-khoa=${searchTerm}`)
                        }}
                        hidden
                        defaultValue
                      />
                    </form>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
              <div className="hidden items-center xl:flex space-x-2">
                <ul className="hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                        : 'inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:text-neutral-300 hover:bg-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 !font-semibold !text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:!text-neutral-100'
                    }
                    to="/"
                  >
                    Trang Chủ
                  </NavLink>
                  {tags.map((tag) => (
                    <NavLink
                      key={tag?.tagId}
                      className={({ isActive }) =>
                        isActive
                          ? 'relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                          : 'inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:text-neutral-300 hover:bg-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 !font-semibold !text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:!text-neutral-100'
                      }
                      to={`/${convertToUrl(tag?.tagName)}`}
                    >
                      {capitalizeWords(tag?.tagName)}
                    </NavLink>
                  ))}
                  {/* <li
                    className="menu-item menu-dropdown relative"
                    onMouseEnter={() => setVisibleCategoryDropdown(true)}
                    onMouseLeave={() => setVisibleCategoryDropdown(false)}
                  >
                    <div
                      className="inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 !font-semibold !text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:!text-neutral-100"
                      rel="noopener noreferrer"
                      id="headlessui-popover-button-:rei:"
                      aria-expanded="false"
                      aria-current="page"
                    >
                      Chuyên mục
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-1 -mr-1 h-4 w-4 text-neutral-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    {visibleCategoryDropdown && (
                      <div
                        className="sub-menu absolute transform z-10 min-w-[240px] pt-3 left-0 opacity-100 translate-y-0"
                        id="headlessui-popover-panel-:rej:"
                        tabIndex={-1}
                      >
                        <ul className="rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 text-sm relative bg-white dark:bg-neutral-800 py-3 grid space-y-1">
                          {categories.map((category) => (
                            <li key={category?.categoryId} className="px-2">
                              <NavLink
                                aria-current="page"
                                className="flex items-center font-normal text-neutral-6000 dark:text-neutral-300 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 font-semibold text-neutral-700 dark:!text-neutral-200"
                                rel="noopener noreferrer"
                                to={`/${convertToUrl(category?.categoryName)}`}
                              >
                                <span className="flex-shrink-0">
                                  {category?.categoryName}
                                </span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li> */}
                </ul>
                <div className="hidden sm:block h-10 border-l mx-2 border-neutral-300 dark:border-neutral-6000" />
                {darkMode ? (
                  <button
                    className="text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center "
                    onClick={toggleDarkMode}
                  >
                    <span className="sr-only">Bật Light Mode</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-7 h-7"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                  </button>
                ) : (
                  <button
                    className="text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center"
                    onClick={toggleDarkMode}
                  >
                    <span className="sr-only">Bật Dark mode</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </button>
                )}
                <div className="flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 relative">
                  {' '}
                  <button
                    className="text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center"
                    title="Xem danh sách bài viết đã lưu"
                    onClick={() => {
                      navigate('/bai-viet-da-luu')
                    }}
                  >
                    <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
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
              {userInfo?.id ? (
                <div className="flex items-center space-x-1.5">
                  <div>
                    <button className="text-opacity-90 group p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative">
                      <span className="w-2 h-2 bg-blue-500 absolute top-2 right-2 rounded-full" />
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 6.43994V9.76994"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit={10}
                          strokeLinecap="round"
                        />
                        <path
                          d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit={10}
                          strokeLinecap="round"
                        />
                        <path
                          d="M15.33 18.8201C15.33 20.6501 13.83 22.1501 12 22.1501C11.09 22.1501 10.25 21.7701 9.65004 21.1701C9.05004 20.5701 8.67004 19.7301 8.67004 18.8201"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit={10}
                        />
                      </svg>
                    </button>
                  </div>
                  <AvatarDropdown />
                </div>
              ) : (
                <NavLink
                  className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                  to="/dang-nhap"
                >
                  Đăng nhập
                </NavLink>
              )}
              <div className="flex items-center space-x-1.5 xl:hidden">
                <div>
                  <button
                    className="p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center"
                    onClick={() => setShow(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isShow && (
                    <div className="relative z-50">
                      <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 opacity-100" />
                      <div className="fixed inset-y-0 left-0 w-screen max-w-sm overflow-y-auto z-50 opacity-100 translate-x-0 animate__animated animate__fadeInLeft ">
                        <div className="flex min-h-full">
                          <div
                            className="w-full max-w-sm overflow-hidden transition-all"
                            ref={sidebarRef}
                          >
                            <div className="w-full h-full py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800 border-r border-transparent dark:border-neutral-700">
                              <div className="py-6 px-5">
                                <NavLink
                                  className="flex items-center justify-center"
                                  to="/"
                                >
                                  <LogoIcon />
                                </NavLink>
                                <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
                                  <span>{''}</span>
                                  <div className="flex justify-between items-center mt-4">
                                    <nav className="flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300">
                                      <a
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300"
                                        href="https://www.facebook.com/profile.php?id=100077916485181"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Ký Túc Xá Cỏ May"
                                      >
                                        <i className="lab la-facebook-square" />
                                      </a>
                                      <a
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300"
                                        href="https://www.youtube.com/channel/UCBfoSJb4tU3NPLTI6VWILFQ"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Ký Túc Xá Cỏ May"
                                      >
                                        <i className="lab la-youtube" />
                                      </a>
                                    </nav>
                                    <span className="block">
                                      {darkMode ? (
                                        <button
                                          className="text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center bg-neutral-100 dark:bg-neutral-800"
                                          onClick={toggleDarkMode}
                                        >
                                          <span className="sr-only">
                                            Enable dark mode
                                          </span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="w-7 h-7"
                                          >
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                          </svg>
                                        </button>
                                      ) : (
                                        <button
                                          className="text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center bg-neutral-100 dark:bg-neutral-800"
                                          onClick={toggleDarkMode}
                                        >
                                          <span className="sr-only">
                                            Bật Dark mode
                                          </span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            className="w-7 h-7"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                          </svg>
                                        </button>
                                      )}
                                    </span>
                                  </div>
                                  <NavLink
                                    className="text-neutral-900 dark:text-white"
                                    to="/bai-viet-da-luu"
                                  >
                                    <div className="flex justify-between font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg uppercase tracking-wide">
                                      <div className="py-2.5 px-4 select-none text-secondary">
                                        Bài viết đã lưu
                                      </div>
                                    </div>
                                  </NavLink>
                                </div>
                                <span className="absolute right-2 top-2 p-1">
                                  <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700  focus:outline-none"
                                    onClick={() => setShow(false)}
                                  >
                                    <span className="sr-only">Close</span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </span>
                              </div>
                              <ul className="flex flex-col py-6 px-2 space-y-1">
                                <NavLink
                                  className="text-neutral-900 dark:text-white"
                                  to="/"
                                >
                                  <div className="flex justify-between font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg uppercase tracking-wide">
                                    <div className="py-2.5 px-4 select-none text-secondary">
                                      Trang chủ
                                    </div>
                                  </div>
                                </NavLink>
                                {tags?.map((tag) => (
                                  <NavLink
                                    key={tag?.tagId}
                                    className="text-neutral-900 dark:text-white"
                                    to={`/${convertToUrl(tag?.tagName)}`}
                                  >
                                    <div className="flex justify-between font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg uppercase tracking-wide">
                                      <div className="py-2.5 px-4 select-none text-secondary">
                                        {tag?.tagName}
                                      </div>
                                    </div>
                                  </NavLink>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="header-post"
        className="dark relative bg-neutral-900 dark:bg-neutral-900"
      ></div>
    </div>
  )
}

export default React.memo(Header)
