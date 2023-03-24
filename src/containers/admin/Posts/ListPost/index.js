import moment from 'moment'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { AiFillPushpin } from 'react-icons/ai'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Confirm from '~/components/Customs/Confirm'
import SavePostButton from '~/components/SavePostButton'
import { deletePost } from '~/store/posts/actions'
import { authSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import convertToUrl from '~/utils/commons/convertToUrl'
import SubmitPost from '../SubmitPost'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function ListPost({ data }) {
  const userInfo = useSelector(authSelector).userInfo

  const dispatch = useDispatch()

  const [visibleFormEditPost, setVisibleFormEditPost] = useState(false)
  const [visibleDeletePost, setVisibleDeletePost] = useState(false)
  const [currentPost, setCurrentPost] = useState(null)

  const handleDeletePost = () => {
    dispatch(deletePost(currentPost.postId))
  }

  const renderCardList = () => {
    return data.map((post) => (
      <div
        key={post?.postId}
        className="relative flex flex-col group rounded-3xl overflow-hidden z-0 h-full"
      >
        <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
          <div className="flex items-center space-x-2 relative">
            <button
              className="relative w-[20px] flex items-center rounded-full leading-none group transition-colors px-3 h-8 text-xs focus:outline-none text-rose-600 bg-rose-50 dark:bg-rose-100"
              title="Chỉnh sửa"
              onClick={() => {
                setVisibleFormEditPost(true)
                setCurrentPost(post)
              }}
            >
              <FaEdit size={15} />
            </button>
            <button
              className="relative items-center w-[20px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 hidden sm:flex px-3 h-8 text-xs focus:outline-none"
              title="Xóa"
              onClick={() => {
                setVisibleDeletePost(true)
                setCurrentPost(post)
              }}
            >
              <FaTrash size={15} />
            </button>
          </div>
          <div className="flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 relative">
            <SavePostButton savedPost={post} />
          </div>
        </div>
        <div className="flex items-start relative w-full aspect-w-4 aspect-h-3 " />
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0">
              <img
                src={post?.thumbnail}
                alt={post?.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <NavLink
          className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
          to={`/${convertToUrl(post?.title)}/${post?.postId}`}
        />
        <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
          <NavLink
            className="absolute inset-0"
            to={`/${convertToUrl(post?.title)}/${post?.postId}`}
          />
          <div className="mb-3">
            <div className="flex flex-wrap space-x-2">
              <div
                className="transition-colors hover:text-white duration-300 nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-pink-800 bg-pink-100 hover:bg-pink-800"
              // to={`/${convertToUrl(post?.category.categoryName)}`}
              >
                {post?.category.categoryName}
              </div>
            </div>
          </div>
          <div className="inline-flex items-center text-xs text-neutral-300">
            <div className="block ">
              <h2 className="block text-lg font-semibold text-white ">
                <span className="line-clamp-2" title={post?.title}>
                  {post?.title}
                </span>
              </h2>
              <button className="flex mt-2.5 relative">
                <span className="block text-neutral-200 hover:text-white font-medium truncate">
                  KTX Cỏ May
                </span>
                <span className="mx-[6px] font-medium">·</span>
                <span className="font-normal truncate">
                  {moment(post?.publishedAt).format('lll')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {renderCardList()}
      {visibleFormEditPost && (
        <SubmitPost
          visible={visibleFormEditPost}
          setVisible={() => setVisibleFormEditPost(!visibleFormEditPost)}
          post={currentPost}
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
    </div>
  )
}

ListPost.propTypes = {
  data: PropTypes.array.isRequired,
  categoryName: PropTypes.string,
}

export default ListPost
