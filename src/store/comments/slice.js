// import { createSlice } from "@reduxjs/toolkit"
// import Swal from "sweetalert2"
// import {
//   addComment,
//   deleteComment,
//   fetchComments,
//   likeComment,
//   updateComment,
// } from "./actions"

// const Toast = Swal.mixin({
//   toast: true,
//   position: "bottom-end",
//   showConfirmButton: false,
//   timer: 10000,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener("mouseenter", Swal.stopTimer)
//     toast.addEventListener("mouseleave", Swal.resumeTimer)
//   },
// })

// const getAllComments = (comments) => {
//   const allComments = []

//   comments.forEach((comment) => {
//     // Bao gồm comment hiện tại vào mảng allComments
//     allComments.push(comment)

//     // Nếu comment hiện tại có các comment con, thực hiện đệ quy để lấy tất cả các comment con
//     if (comment.childs.length > 0) {
//       const childComments = getAllComments(comment.childs)
//       allComments.push(...childComments)
//     }
//   })

//   return allComments
// }

// const commentsSlice = createSlice({
//   name: "comments",
//   initialState: {
//     status: "idle",
//     comments: [],
//     postId: "",
//   },
//   reducers: {
//     addCommentToList: (state, action) => {
//       state.comments.unshift(action.payload)
//     },
//     updateCommentList: (state, action) => {
//       state.comments.forEach((comment, index, array) => {
//         if (comment.commentId === action.payload.commentId) {
//           array[index] = action.payload
//         }
//       })
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchComments.pending, (state, action) => {
//         state.status = "loading"
//       })
//       .addCase(fetchComments.fulfilled, (state, action) => {
//         state.comments = action.payload.comments
//         state.postId = action.payload.postId
//         state.status = "success"
//       })
//       .addCase(fetchComments.rejected, (state, action) => {
//         state.status = "error"
//         Toast.fire({
//           title: "Thêm bình luận",
//           text: action.error.message,
//           icon: "warning",
//         })
//       })
//       .addCase(addComment.pending, (state, action) => {
//         state.status = "isSubmitting"
//       })
//       .addCase(addComment.fulfilled, (state, action) => {
//         if (action.payload.status === "OK") {
//           state.comments = action.payload.data
//           Toast.fire({
//             title: "Thêm bình luận",
//             text: action.payload.message,
//             icon: "success",
//           })
//         } else {
//           Toast.fire({
//             title: "Thêm bình luận",
//             text: action.payload.message,
//             icon: "warning",
//           })
//         }
//       })
//       .addCase(addComment.rejected, (state, action) => {
//         Toast.fire({
//           title: "Thêm bình luận",
//           text: action.error.message,
//           icon: "error",
//         })
//       })
//       .addCase(updateComment.pending, (state, action) => {
//         state.status = "isSubmitting"
//       })
//       .addCase(updateComment.fulfilled, (state, action) => {
//         if (action.payload.status === "OK") {
//           state.comments = action.payload.data
//           Toast.fire({
//             title: "Chỉnh sửa bình luận",
//             text: action.payload.message,
//             icon: "success",
//           })
//         } else {
//           Toast.fire({
//             title: "Chỉnh sửa bình luận",
//             text: action.payload.message,
//             icon: "warning",
//           })
//         }
//       })
//       .addCase(updateComment.rejected, (state, action) => {
//         Toast.fire({
//           title: "Chỉnh sửa bình luận",
//           text: action.error.message,
//           icon: "error",
//         })
//       })
//       .addCase(deleteComment.fulfilled, (state, action) => {
//         if (action.payload.status === "OK") {
//           state.comments = action.payload.data
//           Toast.fire({
//             title: "Xóa bình luận",
//             text: action.payload.message,
//             icon: "success",
//           })
//         } else {
//           Toast.fire({
//             title: "Xóa bình luận",
//             text: action.payload.message,
//             icon: "warning",
//           })
//         }
//       })
//       .addCase(deleteComment.rejected, (state, action) => {
//         Toast.fire({
//           title: "Xóa bình luận",
//           text: action.error.message,
//           icon: "error",
//         })
//       })
//       .addCase(likeComment.fulfilled, (state, action) => {
//         state.comments = state.comments.map((comment) => {
//           if (comment.commentId === action.payload.commentId) {
//             return action.payload
//           } else {
//             return comment
//           }
//         })
//       })
//   },
// })
// export default commentsSlice
