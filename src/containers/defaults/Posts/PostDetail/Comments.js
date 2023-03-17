export default function Comments() {
  return (
    <div>
      <div id="comment" className="max-w-screen-md mx-auto pt-5">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Responses (14)
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
              className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
              type="submit"
            >
              Gửi
            </button>
            <button
              className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonSecondary font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
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
            <div className="flex " data-comment-id={1}>
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base sm:text-lg sm:h-8 sm:w-8 mt-4">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/ncmaz/assets/12.611d0168.jpg"
                  alt="Tousy Vita"
                />
                <span className="wil-avatar__name">T</span>
              </div>
              <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                <div className="relative flex items-center pr-6">
                  <div className="absolute -right-3 -top-3">
                    <div className="relative inline-block text-left">
                      <button
                        className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                        title="More"
                        id="headlessui-menu-button-:rn:"
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
                  <a
                    className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                    href="/ncmaz/author/the-demo-author-slug"
                  >
                    Tousy Vita
                  </a>
                  <span className="mx-2">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                    May 20, 2021
                  </span>
                </div>
                <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                  Praesent id massa id nisl venenatis lacinia. Aenean sit amet
                  justo. Morbi ut odio.
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:text-rose-500"
                    title="Liked"
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
                      96
                    </span>
                  </button>
                  <button
                    className="flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                    title="Reply"
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
                    <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
                      Reply
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="nc-NcModal" />
            <div className="nc-NcModal" />
            <div className="nc-NcModal" />
            <ul className="pl-4 mt-5 space-y-5 md:pl-11">
              <li>
                <div
                  className="nc-CommentCard flex "
                  data-nc-id="CommentCard"
                  data-comment-id={4}
                  data-comment-parent-id={1}
                >
                  <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base  mt-4">
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src="/ncmaz/assets/3.07b2fa37.jpg"
                      alt="Foulcher Nathanil"
                    />
                    <span className="wil-avatar__name">F</span>
                  </div>
                  <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                    <div className="relative flex items-center pr-6">
                      <div className="absolute -right-3 -top-3">
                        <div className="relative inline-block text-left">
                          <button
                            className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                            title="More"
                            id="headlessui-menu-button-:ro:"
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
                      <a
                        className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                        href="/ncmaz/author/the-demo-author-slug"
                      >
                        Foulcher Nathanil
                      </a>
                      <span className="mx-2">·</span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                        May 20, 2021
                      </span>
                    </div>
                    <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                      In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus,
                      aliquet at, feugiat non, pretium quis, lectus. Suspendisse
                      potenti. In eleifend quam a odio. In hac habitasse platea
                      dictumst.
                    </span>
                    <div
                      className="nc-CommentCardLikeReply flex items-center space-x-2 "
                      data-nc-id="CommentCardLikeReply"
                    >
                      <button
                        className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50"
                        title="Liked"
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
                        <span className="text-rose-600">45</span>
                      </button>
                      <button
                        className="flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                        title="Reply"
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
                        <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
                          Reply
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="nc-NcModal" />
                <div className="nc-NcModal" />
                <div className="nc-NcModal" />
                <ul className="pl-4 mt-5 space-y-5 md:pl-9">
                  <li>
                    <div
                      className="nc-CommentCard flex "
                      data-nc-id="CommentCard"
                      data-comment-id={10}
                      data-comment-parent-id={4}
                    >
                      <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base  mt-4">
                        <img
                          className="absolute inset-0 w-full h-full object-cover"
                          src="data:image/jpeg;base64,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"
                          alt="Birrell Chariot"
                        />
                        <span className="wil-avatar__name">B</span>
                      </div>
                      <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                        <div className="relative flex items-center pr-6">
                          <div className="absolute -right-3 -top-3">
                            <div className="relative inline-block text-left">
                              <button
                                className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                                title="More"
                                id="headlessui-menu-button-:rp:"
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
                          <a
                            className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                            href="/ncmaz/author/the-demo-author-slug"
                          >
                            Birrell Chariot
                          </a>
                          <span className="mx-2">·</span>
                          <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                            May 20, 2021
                          </span>
                        </div>
                        <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus. Vivamus vestibulum
                          sagittis sapien. Cum sociis natoque penatibus et
                          magnis dis parturient montes, nascetur ridiculus mus.
                          Etiam vel augue. Vestibulum rutrum rutrum neque.
                          Aenean auctor gravida sem.
                        </span>
                        <div
                          className="nc-CommentCardLikeReply flex items-center space-x-2 "
                          data-nc-id="CommentCardLikeReply"
                        >
                          <button
                            className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:text-rose-500"
                            title="Liked"
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
                              56
                            </span>
                          </button>
                          <button
                            className="flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                            title="Reply"
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
                            <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
                              Reply
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="nc-NcModal" />
                    <div className="nc-NcModal" />
                    <div className="nc-NcModal" />
                    <ul className="pl-4 mt-5 space-y-5 md:pl-9" />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <div
              className="nc-CommentCard flex "
              data-nc-id="CommentCard"
              data-comment-id={6}
            >
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base sm:text-lg sm:h-8 sm:w-8 mt-4">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/ncmaz/assets/1.a634d4f0.jpg"
                  alt="Truelock Alric"
                />
                <span className="wil-avatar__name">T</span>
              </div>
              <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                <div className="relative flex items-center pr-6">
                  <div className="absolute -right-3 -top-3">
                    <div className="relative inline-block text-left">
                      <button
                        className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                        title="More"
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
                  <a
                    className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                    href="/ncmaz/author/the-demo-author-slug"
                  >
                    Truelock Alric
                  </a>
                  <span className="mx-2">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                    May 20, 2021
                  </span>
                </div>
                <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                  Donec diam neque, vestibulum eget, vulputate ut, ultrices vel,
                  augue. Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia Curae; Donec pharetra, magna
                  vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit
                  amet lobortis sapien sapien non mi. Integer ac neque. Duis
                  bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.
                </span>
                <div
                  className="nc-CommentCardLikeReply flex items-center space-x-2 "
                  data-nc-id="CommentCardLikeReply"
                >
                  <button
                    className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:text-rose-500"
                    title="Liked"
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
                      45
                    </span>
                  </button>
                  <button
                    className="flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                    title="Reply"
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
                    <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
                      Reply
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="nc-NcModal" />
            <div className="nc-NcModal" />
            <div className="nc-NcModal" />
            <ul className="pl-4 mt-5 space-y-5 md:pl-11" />
          </li>
          <li>
            <div
              className="nc-CommentCard flex "
              data-nc-id="CommentCard"
              data-comment-id={7}
            >
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base sm:text-lg sm:h-8 sm:w-8 mt-4">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="data:image/jpeg;base64,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"
                  alt="Fones Mimi"
                />
                <span className="wil-avatar__name">F</span>
              </div>
              <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                <div className="relative flex items-center pr-6">
                  <div className="absolute -right-3 -top-3">
                    <div className="relative inline-block text-left">
                      <button
                        className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                        title="More"
                        id="headlessui-menu-button-:rr:"
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
                  <a
                    className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                    href="/ncmaz/author/the-demo-author-slug"
                  >
                    Fones Mimi
                  </a>
                  <span className="mx-2">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                    May 20, 2021
                  </span>
                </div>
                <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                  Morbi porttitor lorem id ligula. Suspendisse ornare consequat
                  lectus. In est risus, auctor sed, tristique in, tempus sit
                  amet, sem.
                </span>
                <div
                  className="nc-CommentCardLikeReply flex items-center space-x-2 "
                  data-nc-id="CommentCardLikeReply"
                >
                  <button
                    className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50"
                    title="Liked"
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
                    <span className="text-rose-600">30</span>
                  </button>
                  <button
                    className="flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                    title="Reply"
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
                    <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
                      Reply
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="nc-NcModal" />
            <div className="nc-NcModal" />
            <div className="nc-NcModal" />
            <ul className="pl-4 mt-5 space-y-5 md:pl-11">
              <li>
                <div
                  className="nc-CommentCard flex "
                  data-nc-id="CommentCard"
                  data-comment-id={3}
                  data-comment-parent-id={7}
                >
                  <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base  mt-4">
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src="/ncmaz/assets/4.ea6dd646.jpg"
                      alt="Falconar Agnes"
                    />
                    <span className="wil-avatar__name">F</span>
                  </div>
                  <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                    <div className="relative flex items-center pr-6">
                      <div className="absolute -right-3 -top-3">
                        <div className="relative inline-block text-left">
                          <button
                            className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                            title="More"
                            id="headlessui-menu-button-:rs:"
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
                      <a
                        className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                        href="/ncmaz/author/the-demo-author-slug"
                      >
                        Falconar Agnes
                      </a>
                      <span className="mx-2">·</span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                        May 20, 2021
                      </span>
                    </div>
                    <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                      Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus
                      id, turpis. Integer aliquet, massa id lobortis convallis,
                      tortor risus dapibus augue, vel accumsan tellus nisi eu
                      orci. Mauris lacinia sapien quis libero. Nullam sit amet
                      turpis elementum ligula vehicula consequat. Morbi a ipsum.
                      Integer a nibh.
                    </span>
                    <div
                      className="nc-CommentCardLikeReply flex items-center space-x-2 "
                      data-nc-id="CommentCardLikeReply"
                    >
                      <button
                        className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50"
                        title="Liked"
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
                        <span className="text-rose-600">66</span>
                      </button>
                      <button
                        className="flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                        title="Reply"
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
                        <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
                          Reply
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="nc-NcModal" />
                <div className="nc-NcModal" />
                <div className="nc-NcModal" />
                <ul className="pl-4 mt-5 space-y-5 md:pl-9">
                  <li>
                    <div
                      className="nc-CommentCard flex "
                      data-nc-id="CommentCard"
                      data-comment-id={9}
                      data-comment-parent-id={3}
                    >
                      <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base  mt-4">
                        <img
                          className="absolute inset-0 w-full h-full object-cover"
                          src="/ncmaz/assets/8.ef128adc.jpg"
                          alt="Sleite Claudetta"
                        />
                        <span className="wil-avatar__name">S</span>
                      </div>
                      <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                        <div className="relative flex items-center pr-6">
                          <div className="absolute -right-3 -top-3">
                            <div className="relative inline-block text-left">
                              <button
                                className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                                title="More"
                                id="headlessui-menu-button-:rt:"
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
                          <a
                            className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                            href="/ncmaz/author/the-demo-author-slug"
                          >
                            Sleite Claudetta
                          </a>
                          <span className="mx-2">·</span>
                          <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                            May 20, 2021
                          </span>
                        </div>
                        <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                          Praesent blandit. Nam nulla. Integer pede justo,
                          lacinia eget, tincidunt eget, tempus vel, pede.
                        </span>
                        <div
                          className="nc-CommentCardLikeReply flex items-center space-x-2 "
                          data-nc-id="CommentCardLikeReply"
                        >
                          <button
                            className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:text-rose-500"
                            title="Liked"
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
                              95
                            </span>
                          </button>
                          <button
                            className="flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                            title="Reply"
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
                            <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
                              Reply
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="nc-NcModal" />
                    <div className="nc-NcModal" />
                    <div className="nc-NcModal" />
                    <ul className="pl-4 mt-5 space-y-5 md:pl-9" />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <div
              className="nc-CommentCard flex "
              data-nc-id="CommentCard"
              data-comment-id={8}
            >
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base sm:text-lg sm:h-8 sm:w-8 mt-4">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/ncmaz/assets/1.a634d4f0.jpg"
                  alt="Truelock Alric"
                />
                <span className="wil-avatar__name">T</span>
              </div>
              <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                <div className="relative flex items-center pr-6">
                  <div className="absolute -right-3 -top-3">
                    <div className="relative inline-block text-left">
                      <button
                        className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                        title="More"
                        id="headlessui-menu-button-:ru:"
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
                  <a
                    className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                    href="/ncmaz/author/the-demo-author-slug"
                  >
                    Truelock Alric
                  </a>
                  <span className="mx-2">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                    May 20, 2021
                  </span>
                </div>
                <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                  Cras mi pede, malesuada in, imperdiet et, commodo vulputate,
                  justo. In blandit ultrices enim. Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit.
                </span>
                <div
                  className="nc-CommentCardLikeReply flex items-center space-x-2 "
                  data-nc-id="CommentCardLikeReply"
                >
                  <button
                    className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:text-rose-500"
                    title="Liked"
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
                      100
                    </span>
                  </button>
                  <button
                    className="flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                    title="Reply"
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
                    <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
                      Reply
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="nc-NcModal" />
            <div className="nc-NcModal" />
            <div className="nc-NcModal" />
            <ul className="pl-4 mt-5 space-y-5 md:pl-11" />
          </li>
          <button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 dark:bg-primary-700 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
            View full comments (+117 comments)
          </button>
        </ul>
      </div>
    </div>
  )
}
