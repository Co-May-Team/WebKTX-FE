/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "~/store/comments/actions"
import { authSelector, commentsSelector } from "~/store/selectors"
import CommentItem from "./CommentItem"
import AddComment from "./FormSubmitComment"

export default function Comments({ postInfo = null }) {
  const userInfo = useSelector(authSelector).userInfo
  const comments = useSelector(commentsSelector).comments

  const dispatch = useDispatch()

  // const renderAllChilds = (comment) => {
  //   // Khởi tạo mảng childs mới
  //   let all_childs = []

  //   const getAllChilds = (data) => {
  //     console.log(data)
  //     // Duyệt qua từng đối tượng trong mảng data
  //     data.forEach((obj) => {
  //       let commentText = `@${comment.user.fullName}: ${obj.commentText}`
  //       all_childs.push({ ...obj, commentText })
  //       // Kiểm tra xem đối tượng có thuộc tính "childs" hay không
  //       if (obj.hasOwnProperty('childs')) {
  //         // Duyệt qua từng đối tượng con trong mảng "childs" của đối tượng cha
  //         obj.childs.forEach((child_obj) => {
  //           let commentText = `@${comment.user.fullName}: ${child_obj.commentText}`
  //           // Thêm vào mảng childs mới
  //           all_childs.push({ ...child_obj, commentText })
  //           if (child_obj.hasOwnProperty('childs')) {
  //             getAllChilds(child_obj.childs)
  //           }
  //         })
  //       }
  //     })
  //   }
  //   // Duyệt qua từng đối tượng trong mảng data
  //   // Kiểm tra xem đối tượng có thuộc tính "childs" hay không
  //   if (comment.hasOwnProperty('childs')) {
  //     getAllChilds(comment.childs)
  //   }
  //   if (all_childs.length === 0) {
  //     return null
  //   } else {
  //     return (
  //       <ul className="pl-4 mt-5 space-y-5 md:pl-11">
  //         {all_childs.map((comment) => (
  //           <li key={comment.id}>
  //             <CommentItem comment={comment} postId={postId} />
  //           </li>
  //         ))}
  //       </ul>
  //     )
  //   }
  // }

  const renderAllChilds = (childs) => {
    return (
      <ul className='pl-4 mt-5 space-y-5 md:pl-11'>
        {childs.map((comment) => (
          <li key={comment.id}>
            <CommentItem comment={comment} postId={postInfo.postId} />
            {comment?.childs &&
              comment?.childs.length > 0 &&
              renderAllChilds(comment?.childs)}
          </li>
        ))}
      </ul>
    )
  }
  console.log(comments)
  useEffect(() => {
    if (postInfo?.postId) {
      dispatch(actions.fetchComments({ postId: postInfo?.postId }))
    }
  }, [postInfo])

  return (
    <div id='binh-luan'>
      <div className='max-w-screen-md mx-auto mt-20 mb-10 '>
        <h3 className='text-xl font-semibold text-neutral-800 dark:text-neutral-200'>
          Thảo luận ({postInfo?.totalComment || 0})
        </h3>
        {userInfo?.id ? (
          <AddComment postId={postInfo?.postId} />
        ) : (
          <div className='flex mt-5 justify-center items-center'>
            <h4 className='text-center'>Vui lòng đăng nhập để bình luận...</h4>
          </div>
        )}
      </div>
      <div className='max-w-screen-md mx-auto my-4'>
        <ul className='space-y-5'>
          {comments?.map((comment) => (
            <li key={comment.id}>
              <CommentItem comment={comment} postId={postInfo?.postId} />
              {comment?.childs &&
                comment?.childs.length > 0 &&
                renderAllChilds(comment?.childs)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
