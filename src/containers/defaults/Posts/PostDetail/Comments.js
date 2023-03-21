import moment from "moment";
import { NavLink } from "react-router-dom";
import { defaultAvatar } from "~/utils/constants/default";

export default function Comments() {
  return (
    <div>
      <div id="binh-luan" className="max-w-screen-md mx-auto pt-5">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Thảo luận (4)
        </h3>
        <form action="#" className="mt-5">
          <textarea
            className="block w-full text-sm rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 "
            rows={4}
            placeholder="Thêm bình luận"
            required
            defaultValue={''}
          />
          <div className="mt-2 space-x-3">
            <button
              className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
              type="submit"
            >
              Gửi
            </button>
            <button
              className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
              type="button"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-screen-md mx-auto my-4">
        <ul className="space-y-5">
          <li>
            <div className="flex">
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base sm:text-lg sm:h-8 sm:w-8 mt-4">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={defaultAvatar}
                  alt="Bác Phạm Văn Bên"
                  title="Bác Phạm Văn Bên"
                />
                <span className="wil-avatar__name">Bác Phạm Văn Bên</span>
              </div>
              <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                <div className="relative flex items-center pr-6">
                  <div className="absolute -right-3 -top-3">
                    <div className="relative inline-block text-left">
                      <button
                        className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                        title="More"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-[18px] w-[18px]"
                          stroke="none"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <NavLink
                    className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                    to="#binh-luan"
                  >
                    Nguyễn Võ Song Toàn
                  </NavLink>
                  <span className="mx-2">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                    {moment(new Date()).format("lll")}
                  </span>
                </div>
                <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                  KTX Cỏ May cố gắng thực hiện giấc mơ đại học cho học sinh, sinh viên nghèo học giỏi, xây dựng một thế hệ vừa có tài, vừa có Tâm
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:text-rose-500"
                    title="Thích"
                  >
                    <svg
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-neutral-900 dark:text-neutral-200">
                      0
                    </span>
                  </button>
                  <button
                    className="flex items-center justify-center rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                    title="Trả lời"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[18px] w-[18px] mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <ul className="pl-4 mt-5 space-y-5 md:pl-11">
              <li>
                <div
                  className="flex"
                >
                  <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base  mt-4">
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src={defaultAvatar}
                      alt="Bác Phạm Văn Bên"
                      title="Bác Phạm Văn Bên"
                    />
                    <span className="wil-avatar__name">Bác Phạm Văn Bên</span>
                  </div>
                  <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                    <div className="relative flex items-center pr-6">
                      <div className="absolute -right-3 -top-3">
                        <div className="relative inline-block text-left">
                          <button
                            className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                            title="More"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                              className="h-[18px] w-[18px]"
                              stroke="none"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <NavLink
                        className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                        to="#binh-luan"
                      >
                        Nguyễn Minh Dũng
                      </NavLink>
                      <span className="mx-2">·</span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                        {moment(new Date()).format("lll")}
                      </span>
                    </div>
                    <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                      KTX Cỏ May cố gắng thực hiện giấc mơ đại học cho học sinh, sinh viên nghèo học giỏi, xây dựng một thế hệ vừa có tài, vừa có Tâm
                    </span>
                    <div
                      className="flex items-center space-x-2"
                    >
                      <button
                        className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50"
                        title="Thích"
                      >
                        <svg
                          className="h-5 w-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-rose-600">0</span>
                      </button>
                      <button
                        className="flex items-center justify-center rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                        title="Trả lời"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-[18px] w-[18px] mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <ul className="pl-4 mt-5 space-y-5 md:pl-9">
                  <li>
                    <div
                      className="flex"
                    >
                      <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base  mt-4">
                        <img
                          className="absolute inset-0 w-full h-full object-cover"
                          src={defaultAvatar}
                          alt="Bác Phạm Văn Bên"
                          title="Bác Phạm Văn Bên"
                        />
                        <span className="wil-avatar__name">Bác Phạm Văn Bên</span>
                      </div>
                      <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                        <div className="relative flex items-center pr-6">
                          <div className="absolute -right-3 -top-3">
                            <div className="relative inline-block text-left">
                              <button
                                className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                                title="Thêm"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  className="h-[18px] w-[18px]"
                                  stroke="none"
                                >
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <NavLink
                            className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                            to="#binh-luan"
                          >
                            Nguyễn Võ Công Toàn
                          </NavLink>
                          <span className="mx-2">·</span>
                          <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                            {moment(new Date()).format("lll")}
                          </span>
                        </div>
                        <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                          KTX Cỏ May cố gắng thực hiện giấc mơ đại học cho học sinh, sinh viên nghèo học giỏi, xây dựng một thế hệ vừa có tài, vừa có Tâm
                        </span>
                        <div
                          className="flex items-center space-x-2"
                        >
                          <button
                            className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:text-rose-500"
                            title="Thích"
                          >
                            <svg
                              className="h-5 w-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-neutral-900 dark:text-neutral-200">
                              0
                            </span>
                          </button>
                          <button
                            className="flex items-center justify-center rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                            title="Trả lời"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-[18px] w-[18px] mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <ul className="pl-4 mt-5 space-y-5 md:pl-9" />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <div
              className="flex"
            >
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base sm:text-lg sm:h-8 sm:w-8 mt-4">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={defaultAvatar}
                  alt="Bác Phạm Văn Bên"
                  title="Bác Phạm Văn Bên"
                />
                <span className="wil-avatar__name">Bác Phạm Văn Bên</span>
              </div>
              <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                <div className="relative flex items-center pr-6">
                  <div className="absolute -right-3 -top-3">
                    <div className="relative inline-block text-left">
                      <button
                        className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                        title="Thêm"
                        id="headlessui-menu-button-:rq:"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-[18px] w-[18px]"
                          stroke="none"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <NavLink
                    className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                    to="#binh-luan"
                  >
                    Nguyễn Võ Song Toàn
                  </NavLink>
                  <span className="mx-2">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                    {moment(new Date()).format("lll")}
                  </span>
                </div>
                <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                  KTX Cỏ May cố gắng thực hiện giấc mơ đại học cho học sinh, sinh viên nghèo học giỏi, xây dựng một thế hệ vừa có tài, vừa có Tâm
                </span>
              </div>
            </div>
          </li>
          <button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 dark:bg-primary-700 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
            Xem tất cả (4 bình luận)
          </button>
        </ul>
      </div>
    </div>
  )
}
