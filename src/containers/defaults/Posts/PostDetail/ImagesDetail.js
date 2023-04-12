/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment"
import "moment/locale/vi" // Import Moment locale for Vietnamese
import { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom/client"
import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa"
import LazyLoad from "react-lazyload"
import { useDispatch, useSelector } from "react-redux"
import { Bounce, Fade, Slide, Zoom } from "react-reveal"
import { useLocation, useNavigate } from "react-router-dom"
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
import Loading from "~/components/Loading"
import { useClickOutside } from "~/hooks"
import postsApi from "~/services/postsApi"
import { authSelector } from "~/store/selectors"
import { defaultAvatar } from "~/utils/constants/default"
import MostViewPosts from "./MostViewPosts"
import ProgressBar from "./ProgressBar"

export default function ImagesDetail(props) {
  const userInfo = useSelector(authSelector).userInfo

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const folderInfo = useLocation().state
  console.log(folderInfo)

  const shareDropdownRef = useRef()
  const moreActionDropdownRef = useRef()

  const [mostViewPosts, setMostViewPosts] = useState([])
  const [visibleShareDropdown, setVisibleShareDropdown] = useState(false)
  const [visibleMoreActionDropdown, setVisibleMoreActionDropdown] =
    useState(false)
  const [copied, setCopied] = useState(false)

  useClickOutside(shareDropdownRef, () => setVisibleShareDropdown(false))
  useClickOutside(moreActionDropdownRef, () =>
    setVisibleMoreActionDropdown(false)
  )

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  useEffect(() => {
    postsApi
      .getAll(
        {
          sort: "viewed",
          order: "desc",
          page: "1",
        },
        {}
      )
      .then((response) => {
        setMostViewPosts(response.data.data.posts)
      })
  }, [])
  useEffect(() => {
    const headerPostElement = (
      <div className='py-4'>
        <div className='container'>
          <div className='flex justify-end lg:justify-between'>
            <div className='hidden lg:flex items-center mr-3'>
              <div className='wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-8 h-8 text-lg ring-1 ring-white dark:ring-neutral-900'>
                <img
                  className='absolute inset-0 w-full h-full object-cover'
                  src={defaultAvatar}
                  alt='Bác Phạm Văn Bên'
                  title='Bác Phạm Văn Bên'
                />
                <span className='wil-avatar__name'>Bác Phạm Văn Bên</span>
              </div>
              <h3 className='ml-4 text-lg line-clamp-1 text-neutral-100'>
                {folderInfo?.title}
              </h3>
            </div>
            <div className='flex items-center space-x-2 text-neutral-800 sm:space-x-3 dark:text-neutral-100'>
              <div className='border-l border-neutral-300 dark:border-neutral-700 h-6' />
              <div className='flex space-x-2'>
                <div className='rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-8 h-8 bg-neutral-100 text-lg dark:bg-neutral-800 dark:text-neutral-300'>
                  <FacebookShareButton url={window.location.href}>
                    <span className='lab la-facebook-f' />
                  </FacebookShareButton>
                </div>
                <div className='rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-8 h-8 bg-neutral-100 text-lg dark:bg-neutral-800 dark:text-neutral-300'>
                  <TwitterShareButton url={window.location.href}>
                    <span className='lab la-twitter' />
                  </TwitterShareButton>
                </div>
                <div className='rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-8 h-8 bg-neutral-100 text-lg dark:bg-neutral-800 dark:text-neutral-300'>
                  <LinkedinShareButton url={window.location.href}>
                    <span className='lab la-linkedin-in' />
                  </LinkedinShareButton>
                </div>
                <div className='rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-8 h-8 bg-neutral-100 text-lg dark:bg-neutral-800 dark:text-neutral-300'>
                  <RedditShareButton url={window.location.href}>
                    <span className='lab la-reddit' />
                  </RedditShareButton>
                </div>
                <div className='rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-8 h-8 bg-neutral-100 text-lg dark:bg-neutral-800 dark:text-neutral-300'>
                  <WhatsappShareButton url={window.location.href}>
                    <span className='lab la-whatsapp' />
                  </WhatsappShareButton>
                </div>
                <div className='rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-8 h-8 bg-neutral-100 text-lg dark:bg-neutral-800 dark:text-neutral-300'>
                  <EmailShareButton url={window.location.href}>
                    <span className='las la-warehouse' />
                  </EmailShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute top-full left-0 w-full progress-container h-[5px] bg-neutral-300 overflow-hidden'>
          <ProgressBar />
        </div>
      </div>
    )
    const headerPostNode = document.getElementById("header-post")
    const root = ReactDOM.createRoot(headerPostNode)
    root.render(headerPostElement)
    return () => {
      root.unmount()
    }
  }, [folderInfo])

  return (
    <>
      <header className='relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black'>
        <div className='dark container relative z-10'>
          <div className='max-w-screen-md'>
            <div className='space-y-5'>
              <div className='flex flex-wrap space-x-2'>
                <Slide left>
                  <div className='transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs !px-3 text-pink-800 bg-pink-100 hover:bg-pink-800'>
                    Hình ảnh
                  </div>
                </Slide>
              </div>
              <h1
                className=' text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl '
                title={folderInfo?.title}
              >
                <Bounce right cascade>
                  {folderInfo?.title}
                </Bounce>
              </h1>
              <div className='w-full border-b border-neutral-100 dark:border-neutral-800' />
              <div className='flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5'>
                <Fade left>
                  <div className='flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0'>
                    <div className='flex items-center space-x-2'>
                      <div className='wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full shadow-inner h-10 w-10 sm:h-11 sm:w-11 text-xl ring-1 ring-white dark:ring-neutral-900'>
                        <img
                          className='absolute inset-0 w-full h-full object-cover'
                          src={defaultAvatar}
                          alt='Bác Phạm Văn Bên'
                          title='Bác Phạm Văn Bên'
                        />
                        <span className='wil-avatar__name'>
                          Bác Phạm Văn Bên
                        </span>
                      </div>
                    </div>
                    <div className='ml-3'>
                      <div className='flex items-center'>
                        <div className='block font-semibold'>KTX Cỏ May</div>
                      </div>
                      <div className='text-xs mt-[6px]'>
                        <span className='text-neutral-700 dark:text-neutral-300'>
                          {moment(folderInfo?.createdTime).format("lll")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Fade>
                <div>
                  <div className='flex flex-row space-x-2.5 items-center'>
                    <div
                      className='relative inline-block text-left'
                      ref={shareDropdownRef}
                    >
                      <Fade right>
                        <button
                          className='flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full'
                          title='Chia sẻ'
                          onClick={() =>
                            setVisibleShareDropdown(!visibleShareDropdown)
                          }
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                              d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                            />
                          </svg>
                        </button>
                      </Fade>
                      {visibleShareDropdown && (
                        <div className='absolute origin-top-right right-0 w-56 mt-2 bg-white dark:bg-neutral-900 rounded-lg divide-y divide-neutral-100 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 focus:outline-none z-30 transform opacity-100 scale-100 animate__animated animate__zoomIn animate__faster'>
                          <div
                            className='px-1 py-3 text-sm text-neutral-6000 dark:text-neutral-300'
                            role='none'
                          >
                            <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
                              <FacebookShareButton url={window.location.href}>
                                <FaFacebook className='mr-1 w-7 text-base' />
                                <span className='truncate'>Facebook</span>
                              </FacebookShareButton>
                            </button>
                            <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
                              <TwitterShareButton url={window.location.href}>
                                <FaTwitter className='mr-1 w-7 text-base' />
                                <span className='truncate'>Twitter</span>
                              </TwitterShareButton>
                            </button>
                            <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
                              <LinkedinShareButton url={window.location.href}>
                                <FaLinkedin className='mr-1 w-7 text-base' />
                                <span className='truncate'>LinkedIn</span>
                              </LinkedinShareButton>
                            </button>
                            <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
                              <TelegramShareButton url={window.location.href}>
                                <FaTelegram className='mr-1 w-7 text-base' />
                                <span className='truncate'>Telegram</span>
                              </TelegramShareButton>
                            </button>
                            <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
                              <WhatsappShareButton url={window.location.href}>
                                <FaWhatsapp className='mr-1 w-7 text-base' />
                                <span className='truncate'>Whatsapp</span>
                              </WhatsappShareButton>
                            </button>
                            <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
                              <RedditShareButton url={window.location.href}>
                                <FaReddit className='mr-1 w-7 text-base' />
                                <span className='truncate'>Reddit</span>
                              </RedditShareButton>
                            </button>
                            <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
                              <EmailShareButton url={window.location.href}>
                                <FaEnvelope className='mr-1 w-7 text-base' />
                                <span className='truncate'>Email</span>
                              </EmailShareButton>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div
                        className='relative inline-block text-left'
                        ref={moreActionDropdownRef}
                      >
                        <Fade right>
                          <button
                            className='text-neutral-500 dark:text-neutral-400 flex items-center justify-center rounded-full  h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 focus:outline-none'
                            title='khác'
                            onClick={() =>
                              setVisibleMoreActionDropdown(
                                !visibleMoreActionDropdown
                              )
                            }
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                              className='h-5 w-5'
                              stroke='none'
                            >
                              <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
                            </svg>
                          </button>
                        </Fade>
                        {visibleMoreActionDropdown && (
                          <div className='absolute origin-top-right right-0 w-56 mt-2 bg-white dark:bg-neutral-900 rounded-lg divide-y divide-neutral-100 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 focus:outline-none z-30 transform opacity-100 scale-100 animate__animated animate__zoomIn animate__faster'>
                            <div className='px-1 py-3 text-sm text-neutral-6000 dark:text-neutral-300'>
                              <button
                                className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'
                                onClick={handleCopyClick}
                              >
                                <i className='las la-copy mr-1 w-7 text-base' />
                                <span className='truncate'>
                                  {copied ? "Đã sao chép" : "Sao chép link"}
                                </span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3'>
          <div className='hidden md:block absolute top-0 left-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r' />
          <img
            className='block w-full h-full object-cover'
            src={folderInfo?.images[0].webContentLink}
            alt={folderInfo?.title}
          />
        </div>
      </header>
      <div className='container flex flex-col my-10 lg:flex-row '>
        <div className='w-full'>
          <div className='space-y-10'>
            <Zoom right cascade>
              <div className='prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert content-wrapper'>
                {folderInfo?.images.map((image) => (
                  <Fade key={image.id} bottom>
                    <LazyLoad placeholder={<Loading />} offset={100}>
                      <img
                        src={image.webContentLink}
                        alt={folderInfo.title}
                        title={folderInfo.title}
                      />
                    </LazyLoad>
                    <img
                      src={image.webContentLink}
                      alt={folderInfo.title}
                      title={folderInfo.title}
                    />
                  </Fade>
                ))}
              </div>
            </Zoom>
            {/* <div className="max-w-screen-md mx-auto flex flex-wrap">
                            <div
                                className="nc-Tag inline-block bg-white text-sm text-neutral-600 dark:text-neutral-300 py-2 px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2"
                            >
                                Garden
                            </div>
                            <div
                                className="nc-Tag inline-block bg-white text-sm text-neutral-600 dark:text-neutral-300 py-2 px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2"
                            >
                                Jewelry
                            </div>
                            <div
                                className="nc-Tag inline-block bg-white text-sm text-neutral-600 dark:text-neutral-300 py-2 px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2"
                            >
                                Tools
                            </div>
                        </div> */}
            <div className='max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700' />
            <div className='max-w-screen-md mx-auto '>
              <div className='flex'>
                <div>
                  <div className='wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-xl h-12 w-12 text-lg sm:text-xl sm:h-24 sm:w-24 ring-1 ring-white dark:ring-neutral-900'>
                    <img
                      className='absolute inset-0 w-full h-full object-cover'
                      src={defaultAvatar}
                      alt='Bác Phạm Văn Bên'
                      title='Bác Phạm Văn Bên'
                    />
                    <span className='wil-avatar__name'>Bác Phạm Văn Bên</span>
                  </div>
                </div>
                <div className='flex flex-col ml-3 max-w-lg sm:ml-5'>
                  <span className='text-xs text-neutral-400 uppercase tracking-wider'></span>
                  <h2 className='text-lg font-semibold text-neutral-900 dark:text-neutral-200'>
                    KTX Cỏ May
                  </h2>
                  <span className='text-sm text-neutral-500 sm:text-base dark:text-neutral-300'>
                    KTX Cỏ May cố gắng thực hiện giấc mơ đại học cho học sinh,
                    sinh viên nghèo học giỏi, xây dựng một thế hệ vừa có tài,
                    vừa có Tâm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-28'>
        <MostViewPosts listPost={mostViewPosts} />
      </div>
    </>
  )
}
