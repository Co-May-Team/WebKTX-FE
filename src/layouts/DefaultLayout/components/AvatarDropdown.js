import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useClickOutside } from '~/hooks'
import { logout } from '~/store/auth/actions'
import { path } from '~/utils'
import { defaultAvatar } from '~/utils/constants/default'

function AvatarDropdown() {
  const dispatch = useDispatch()

  const avatarDropdownRef = useRef()

  const [visibleAvatarDropdown, setVisibleAvatarDropdown] = useState(false)

  useClickOutside(avatarDropdownRef, () => setVisibleAvatarDropdown(false))

  return (
    <div className="relative" ref={avatarDropdownRef}>
      <button
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        style={{ transform: 'translateY(-25%)' }}
        onClick={() => setVisibleAvatarDropdown(!visibleAvatarDropdown)}
      >
        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-8 h-8 sm:w-9 sm:h-9 ring-1 ring-white dark:ring-neutral-900">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={defaultAvatar}
            alt="Bác Phạm Văn Bên"
          />
          <span className="wil-avatar__name">Bác Phạm Văn Bên</span>
        </div>
      </button>
      {visibleAvatarDropdown && (
        <div className="absolute z-10 w-screen max-w-[260px] px-4 -right-10 sm:right-0 sm:px-0 opacity-100 translate-y-0 transition animate__animated animate__fadeInRight animate__faster">
          <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
              <div className="flex items-center space-x-3">
                <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-12 h-12 ring-1 ring-white dark:ring-neutral-900">
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={defaultAvatar}
                    alt="Bác Phạm Văn Bên"
                  />
                  <span className="wil-avatar__name">Bác Phạm Văn Bên</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold">KTX Cỏ May</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Ban Quản Lý
                  </p>
                </div>
              </div>
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
              <NavLink
                className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                to={path.ADMIN + path.ADMIN_HOME}
              >
                <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium ">Trình quản lý</p>
                </div>
              </NavLink>
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
              <button
                className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                onClick={() => dispatch(logout())}
              >
                <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 12H3.62"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium ">Đăng xuất</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(AvatarDropdown)
