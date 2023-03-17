import moment from 'moment'
import 'moment/locale/vi' // Import Moment locale for Vietnamese
import { useEffect, useState } from 'react'
import {
  FaEnvelope,
  FaEye,
  FaFacebook,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import postsApi from '~/apis/postsApi'
import Confirm from '~/components/Customs/Confirm'
import SubmitPost from '~/containers/admin/Posts/SubmitPost'
import { deletePost } from '~/store/posts/actions'
import { authSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import convertToUrl from '~/utils/commons/convertToUrl'
import readingTime from '~/utils/commons/readingTime'
import { defaultAvatar } from '~/utils/constants/default'
import styles from './index.module.scss'
import MostViewPosts from './MostViewPosts'
import RelatedPosts from './RelatedPosts'

const cx = bindClassNames(styles)

function PostDetail(props) {
  const userInfo = useSelector(authSelector).userInfo

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const [postInfo, setPostInfo] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [mostViewPosts, setMostViewPosts] = useState([])
  const [visibleFormEditPost, setVisibleFormEditPost] = useState(false)
  const [visibleDeletePost, setVisibleDeletePost] = useState(false)
  const [visibleShareDropdown, setVisibleShareDropdown] = useState(false)

  useEffect(() => {
    postsApi
      .getAll(
        {
          sort: 'viewed',
          order: 'desc',
          page: '1',
        },
        {}
      )
      .then((response) => {
        setMostViewPosts(response.data.data.posts)
      })
  }, [])
  useEffect(() => {
    postsApi.get(params.id).then((response) => {
      document.title = response.data.data.posts.title
      setPostInfo(response.data.data.posts)
      setRelatedPosts(response.data.data.relatedPost)
    })
  }, [params.id])

  const handleDeletePost = () => {
    dispatch(deletePost(postInfo.postId))
    navigate(-1)
  }

  return (
    <>
      <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
        <div className="dark container relative z-10">
          <div className="max-w-screen-md">
            <div className="space-y-5">
              <div className="flex flex-wrap space-x-2">
                <NavLink
                  className="transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs !px-3 text-pink-800 bg-pink-100 hover:bg-pink-800"
                  to={`/${convertToUrl(postInfo?.category.categoryName)}`}
                >
                  {postInfo?.category.categoryName}
                </NavLink>
              </div>
              <h1
                className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl "
                title="Quiet ingenuity: 120,000 lunches and counting"
              >
                {postInfo?.title}
              </h1>
              <div className="w-full border-b border-neutral-100 dark:border-neutral-800" />
              <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
                <div
                  className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0"
                  data-nc-id="PostMeta2"
                >
                  <div className="flex items-center space-x-2">
                    <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full shadow-inner h-10 w-10 sm:h-11 sm:w-11 text-xl ring-1 ring-white dark:ring-neutral-900">
                      <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={defaultAvatar}
                        alt="Bác Phạm Văn Bên"
                        title="Bác Phạm Văn Bên"
                      />
                      <span className="wil-avatar__name">Bác Phạm Văn Bên</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <div className="block font-semibold">KTX Cỏ May</div>
                    </div>
                    <div className="text-xs mt-[6px]">
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {moment(postInfo?.publishedAt).format('lll')}
                      </span>
                      <span className="mx-2 font-semibold">·</span>
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {readingTime(postInfo?.content)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row space-x-2.5 items-center">
                    <div className="flex items-center justify-center space-x-2 !space-x-2.5">
                      <button
                        className="relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors px-4 h-9 text-sm focus:outline-none text-rose-600 bg-rose-50 dark:bg-rose-100"
                        title="Lượt xem"
                      >
                        <FaEye size={15} />
                        <span className="ml-1 text-rose-600">
                          {postInfo?.viewed}
                        </span>
                      </button>
                      <div
                        className="relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden sm:flex  px-4 h-9 text-sm focus:outline-none"
                        title="Bình luận"
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
                      </div>
                    </div>
                    <div className="px-1">
                      <div className="border-l border-neutral-200 dark:border-neutral-700 h-6" />
                    </div>
                    <button
                      className="relative rounded-full flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
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
                    <div className="relative inline-block text-left">
                      <button
                        className="flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
                        title="Chia sẻ"
                        id="headlessui-menu-button-:rl:"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={visibleShareDropdown ? 'true' : 'false'}
                        aria-controls="headlessui-menu-items-:r38:"
                        onClick={() =>
                          setVisibleShareDropdown(!visibleShareDropdown)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </button>
                      {visibleShareDropdown && (
                        <div
                          className="absolute origin-top-right right-0 w-56 mt-2 bg-white dark:bg-neutral-900 rounded-lg divide-y divide-neutral-100 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 focus:outline-none z-30 transform opacity-100 scale-100"
                          aria-labelledby="headlessui-menu-button-:rl:"
                          id="headlessui-menu-items-:r38:"
                          role="menu"
                          tabIndex={0}
                        >
                          <div
                            className="px-1 py-3 text-sm text-neutral-6000 dark:text-neutral-300"
                            role="none"
                          >
                            <div
                              data-menu-item-id="Facebook"
                              id="headlessui-menu-item-:r39:"
                              role="menuitem"
                              tabIndex={-1}
                            >
                              <div className="flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none">
                                <FacebookShareButton url={window.location.href}>
                                  <FaFacebook className="mr-1 w-7 text-base" />
                                  <span className="truncate">Facebook</span>
                                </FacebookShareButton>
                              </div>
                            </div>
                            <div
                              data-menu-item-id="Twitter"
                              id="headlessui-menu-item-:r39:"
                              role="menuitem"
                              tabIndex={-1}
                            >
                              <div className="flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none">
                                <TwitterShareButton url={window.location.href}>
                                  <FaTwitter className="mr-1 w-7 text-base" />
                                  <span className="truncate">Twitter</span>
                                </TwitterShareButton>
                              </div>
                            </div>
                            <div
                              data-menu-item-id="LinkedIn"
                              id="headlessui-menu-item-:r39:"
                              role="menuitem"
                              tabIndex={-1}
                            >
                              <div className="flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none">
                                <LinkedinShareButton url={window.location.href}>
                                  <FaLinkedin className="mr-1 w-7 text-base" />
                                  <span className="truncate">LinkedIn</span>
                                </LinkedinShareButton>
                              </div>
                            </div>
                            <div
                              data-menu-item-id="Telegram"
                              id="headlessui-menu-item-:r39:"
                              role="menuitem"
                              tabIndex={-1}
                            >
                              <div className="flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none">
                                <TelegramShareButton url={window.location.href}>
                                  <FaTelegram className="mr-1 w-7 text-base" />
                                  <span className="truncate">Telegram</span>
                                </TelegramShareButton>
                              </div>
                            </div>
                            <div
                              data-menu-item-id="Whatsapp"
                              id="headlessui-menu-item-:r39:"
                              role="menuitem"
                              tabIndex={-1}
                            >
                              <div className="flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none">
                                <WhatsappShareButton url={window.location.href}>
                                  <FaWhatsapp className="mr-1 w-7 text-base" />
                                  <span className="truncate">Whatsapp</span>
                                </WhatsappShareButton>
                              </div>
                            </div>
                            <div
                              data-menu-item-id="Reddit"
                              id="headlessui-menu-item-:r39:"
                              role="menuitem"
                              tabIndex={-1}
                            >
                              <div className="flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none">
                                <RedditShareButton url={window.location.href}>
                                  <FaReddit className="mr-1 w-7 text-base" />
                                  <span className="truncate">Reddit</span>
                                </RedditShareButton>
                              </div>
                            </div>
                            <div
                              data-menu-item-id="Email"
                              id="headlessui-menu-item-:r39:"
                              role="menuitem"
                              tabIndex={-1}
                            >
                              <div className="flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none">
                                <EmailShareButton url={window.location.href}>
                                  <FaEnvelope className="mr-1 w-7 text-base" />
                                  <span className="truncate">Email</span>
                                </EmailShareButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="relative inline-block text-left">
                        <button
                          className="text-neutral-500 dark:text-neutral-400 flex items-center justify-center rounded-full  h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 focus:outline-none"
                          title="Thêm"
                          id="headlessui-menu-button-:rm:"
                          type="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-5"
                            stroke="none"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
          <div className="hidden md:block absolute top-0 left-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r" />
          <img
            className="block w-full h-full object-cover"
            src={postInfo?.thumbnail}
            alt={postInfo?.title}
          />
        </div>
      </header>
      <div className="container flex flex-col my-10 lg:flex-row ">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-20">
          <div className="space-y-10">
            <div
              className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: postInfo?.content,
              }}
            />
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
            <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700" />
            <div className="max-w-screen-md mx-auto ">
              <div className="flex">
                <div>
                  <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-xl h-12 w-12 text-lg sm:text-xl sm:h-24 sm:w-24  ring-1 ring-white dark:ring-neutral-900">
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src={defaultAvatar}
                      alt="Bác Phạm Văn Bên"
                      title="Bác Phạm Văn Bên"
                    />
                    <span className="wil-avatar__name">Bác Phạm Văn Bên</span>
                  </div>
                </div>
                <div className="flex flex-col ml-3 max-w-lg sm:ml-5">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider"></span>
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
                    KTX Cỏ May
                  </h2>
                  <span className="text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
                    KTX Cỏ May cố gắng thực hiện giấc mơ đại học cho học sinh,
                    sinh viên nghèo học giỏi, xây dựng một thế hệ vừa có tài,
                    vừa có Tâm
                  </span>
                </div>
              </div>
            </div>
            {/* <Comments /> */}
          </div>
        </div>
        <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
          <div className="nc-SingleSidebar space-y-6 "></div>
          <MostViewPosts listPost={mostViewPosts} />
        </div>
      </div>

      <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-28">
        <RelatedPosts listPost={relatedPosts} />
      </div>
      {visibleFormEditPost && (
        <SubmitPost
          visible={visibleFormEditPost}
          setVisible={() => setVisibleFormEditPost(!visibleFormEditPost)}
          post={postInfo}
        />
      )}
      {visibleDeletePost && (
        <Confirm
          visible={visibleDeletePost}
          setVisible={() => setVisibleDeletePost(!visibleDeletePost)}
          title="Xóa bài đăng"
          content="Bạn có chắc muốn xóa bài đăng này?"
          onConfirm={handleDeletePost}
        />
      )}
    </>
  )
}

PostDetail.propTypes = {}

export default PostDetail
