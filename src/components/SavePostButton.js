import { useState } from 'react'
import Swal from 'sweetalert2'
import { isSaved, toggleSavePost } from '~/utils/commons/savedPosts'

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export default function SavePostButton({
  savedPost,
  onClick = () => {},
  dark = false,
}) {
  const [saved, setSaved] = useState(isSaved(savedPost))

  const handleToggleSavePost = () => {
    toggleSavePost(savedPost)
    if (saved) {
      Toast.fire({
        title: 'Lưu bài viết',
        text: 'Xóa bài viết khỏi danh Bài viết đã lưu thành công',
        icon: 'success',
      })
    } else {
      Toast.fire({
        title: 'Lưu bài viết',
        text: 'Lưu bài viết thành công',
        icon: 'success',
      })
    }
    setSaved(!saved)
    onClick(JSON.parse(localStorage.getItem('savedPosts')))
  }

  return (
    <button
      className={
        dark
          ? 'relative rounded-full flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200'
          : 'relative rounded-full flex items-center justify-center focus:outline-none h-8 w-8 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700'
      }
      title={saved ? 'Xóa khỏi danh sách bài viết đã lưu' : 'Lưu bài viết'}
      onClick={handleToggleSavePost}
    >
      <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          aria-hidden="true"
          fill={saved ? 'currentColor' : 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
        />
      </svg>
    </button>
  )
}
