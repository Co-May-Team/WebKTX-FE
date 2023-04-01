import moment from 'moment'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Fade } from 'react-reveal'
import { useNavigate } from 'react-router-dom'
import Confirm from '~/components/Customs/Confirm'
import { useClickOutside } from '~/hooks'
import { deleteComment } from '~/store/comments/actions'
import { authSelector } from '~/store/selectors'
import { defaultAvatar } from '~/utils/constants/default'
import FormSubmitComment from './FormSubmitComment'

export default function CommentItem({ postId, comment }) {
  const userInfo = useSelector(authSelector).userInfo

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const moreActionDropdownRef = useRef()

  const [visibleMoreActionDropdown, setVisibleMoreActionDropdown] =
    useState(false)
  const [showFormReplyComment, setShowFormReplyComment] = useState(false)
  const [showFormUpdateComment, setShowFormUpdateComment] = useState(false)
  const [visibleDeleteComment, setVisibleDeleteComment] = useState(false)

  useClickOutside(moreActionDropdownRef, () =>
    setVisibleMoreActionDropdown(false)
  )
  const handleDeleteComment = () => {
    dispatch(deleteComment(comment.id))
    navigate(-1)
  }

  return (
    <Fade fade bottom>
      <div className="flex">
        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base sm:text-lg sm:h-8 sm:w-8 mt-4">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={comment.user?.avatar || defaultAvatar}
            alt={comment.user?.fullName}
            title={comment.user?.fullName}
          />
          <span className="wil-avatar__name">{comment.user?.fullName}</span>
        </div>
        <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
          <div className="relative flex items-center pr-6">
            {userInfo?.id && (
              <div className="absolute -right-3 -top-3">
                <div
                  className="relative inline-block text-left"
                  ref={moreActionDropdownRef}
                >
                  <button
                    className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                    title="Thêm"
                    onClick={() =>
                      setVisibleMoreActionDropdown(!visibleMoreActionDropdown)
                    }
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
                  {visibleMoreActionDropdown && (
                    <div className="absolute origin-top-right right-0 w-56 mt-2 bg-white dark:bg-neutral-900 rounded-lg divide-y divide-neutral-100 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 focus:outline-none z-30 transform scale-100 animate__animated animate__zoomIn animate__faste">
                      <div className="px-1 py-3 text-sm text-neutral-6000 dark:text-neutral-300">
                        {userInfo?.id === comment.user.id && (
                          <button
                            className="flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none"
                            onClick={() =>
                              setShowFormUpdateComment(!showFormUpdateComment)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                            <span className="ml-3">Chỉnh sửa</span>
                          </button>
                        )}
                        <button
                          className="flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none"
                          onClick={() =>
                            setShowFormReplyComment(!showFormReplyComment)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                          </svg>
                          <span className="ml-3">Phản hồi</span>
                        </button>
                        {userInfo?.id === comment.user.id && (
                          <button
                            className="flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none"
                            onClick={() =>
                              setVisibleDeleteComment(!visibleDeleteComment)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                            <span className="ml-3">Xóa</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100">
              {comment.user?.fullName}
            </div>
            <span className="mx-2">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
              {moment(new Date()).format('lll')}
            </span>
          </div>
          <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
            {showFormUpdateComment ? (
              <FormSubmitComment
                cancelComment={() => setShowFormUpdateComment(false)}
                postId={postId}
                comment={comment}
              />
            ) : (
              comment.commentText
            )}
          </span>
          {userInfo?.id && (
            <>
              <div className="flex items-center space-x-2">
                <button
                  className="flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:text-rose-500"
                  title="Thích"
                >
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24">
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
                  0
                </button>
                <button
                  className="flex items-center justify-center rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 focus:outline-none "
                  title="Phản hồi"
                  onClick={() => setShowFormReplyComment(!showFormReplyComment)}
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
              {showFormReplyComment && (
                <FormSubmitComment
                  cancelComment={() => setShowFormReplyComment(false)}
                  postId={postId}
                  parentComment={comment}
                />
              )}
              {visibleDeleteComment && (
                <Confirm
                  visible={visibleDeleteComment}
                  setVisible={() =>
                    setVisibleDeleteComment(!visibleDeleteComment)
                  }
                  title="Xóa bình luận"
                  content="Bạn có chắc muốn xóa bình luận này?"
                  onConfirm={handleDeleteComment}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Fade>
  )
}
