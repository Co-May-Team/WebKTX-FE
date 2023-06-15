import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit/dist"
import Swal from "sweetalert2"
import postsApi from "~/services/postsApi"

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 10000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer)
    toast.addEventListener("mouseleave", Swal.resumeTimer)
  },
})

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    posts: [],
    nameFileUpload: "",
  },
  reducers: {
    addPostToList: (state, action) => {
      state.posts.unshift(action.payload)
    },
    updatePostList: (state, action) => {
      state.posts.forEach((post, index, array) => {
        if (post.postId === action.payload.postId) {
          array[index] = action.payload
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts
        state.pagination = action.payload.pagination
        state.status = "success"
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error"
      })
      .addCase(fetchHiddenPosts.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchHiddenPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts
        state.pagination = action.payload.pagination
        state.status = "success"
      })
      .addCase(fetchHiddenPosts.rejected, (state, action) => {
        state.status = "error"
      })
      .addCase(loadMorePosts.pending, (state, action) => {
        state.status = "loadingMore"
      })
      .addCase(loadMorePosts.fulfilled, (state, action) => {
        if (action.payload.posts?.length === 0) {
          state.status = "loadingFull"
        } else {
          state.posts = [...state.posts, ...action.payload.posts]
          state.pagination = action.payload.pagination
          state.status = "success"
        }
      })
      .addCase(loadMorePosts.rejected, (state, action) => {
        state.status = "error"
      })
      .addCase(loadMoreHiddenPosts.pending, (state, action) => {
        state.status = "loadingMore"
      })
      .addCase(loadMoreHiddenPosts.fulfilled, (state, action) => {
        if (action.payload.posts?.length === 0) {
          state.status = "loadingFull"
        } else {
          state.posts = [...state.posts, ...action.payload.posts]
          state.pagination = action.payload.pagination
          state.status = "success"
        }
      })
      .addCase(loadMoreHiddenPosts.rejected, (state, action) => {
        state.status = "error"
      })
      .addCase(addPost.pending, (state, action) => {
        state.status = "isSubmitting"
      })
      .addCase(addPost.fulfilled, (state, action) => {
        if (action.payload.status === "OK") {
          state.posts.unshift(action.payload.data)
          Toast.fire({
            title: "Thêm bài viết",
            text: action.payload.message,
            icon: "success",
          })
        } else {
          Toast.fire({
            title: "Thêm bài viết",
            text: action.payload.message,
            icon: "warning",
          })
        }
      })
      .addCase(addPost.rejected, (state, action) => {
        Toast.fire({
          title: "Thêm bài viết",
          text: action.error.message,
          icon: "error",
        })
      })
      .addCase(updatePost.pending, (state, action) => {
        state.status = "isSubmitting"
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (action.payload.status === "OK") {
          state.posts.forEach((post, index, array) => {
            if (post.postId === action.payload.data.postId) {
              array[index] = action.payload.data
            }
          })
          Toast.fire({
            title: "Chỉnh sửa bài viết",
            text: action.payload.message,
            icon: "success",
          })
        } else {
          Toast.fire({
            title: "Chỉnh sửa bài viết",
            text: action.payload.message,
            icon: "warning",
          })
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        Toast.fire({
          title: "Chỉnh sửa bài viết",
          text: action.error.message,
          icon: "error",
        })
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (action.payload.status === "OK") {
          state.posts = state.posts.filter(
            (post) => post.postId !== action.payload.postId
          )
          Toast.fire({
            title: "Xóa bài viết",
            text: action.payload.message,
            icon: "success",
          })
        } else {
          Toast.fire({
            title: "Xóa bài viết",
            text: action.payload.message,
            icon: "warning",
          })
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        Toast.fire({
          title: "Xóa bài viết",
          text: action.error.message,
          icon: "error",
        })
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          if (post.postId === action.payload.postId) {
            return action.payload
          } else {
            return post
          }
        })
        console.log(state.posts)
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        if (action.payload.status === "OK") {
          state.nameFileUpload = action.payload.data
        }
      })
  },
})

export const { addPostToList, updatePostList } = postsSlice.actions

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params) => {
    const response = await postsApi.getAll(params.params, params.filters)
    return response.data.data
  }
)
export const fetchHiddenPosts = createAsyncThunk(
  "posts/fetchHiddenPosts",
  async (params) => {
    const response = await postsApi.getAllHiddenPosts(
      params.params,
      params.filters
    )
    return response.data.data
  }
)
export const loadMorePosts = createAsyncThunk(
  "posts/loadMorePosts",
  async (params) => {
    const response = await postsApi.getAll(params.params, params.filters)
    return response.data.data
  }
)
export const loadMoreHiddenPosts = createAsyncThunk(
  "posts/loadMoreHiddenPosts",
  async (params) => {
    const response = await postsApi.getAllHiddenPosts(
      params.params,
      params.filters
    )
    return response.data.data
  }
)
export const addPost = createAsyncThunk("posts/addPost", async (postInfo) => {
  const response = await postsApi.addPost(postInfo)
  return response.data
})
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postInfo) => {
    const response = await postsApi.updatePost(postInfo)
    return response.data
  }
)
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    const response = await postsApi.deletePost(postId)
    return { ...response.data, postId: postId }
  }
)
export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, like }) => {
    const response = await postsApi.likePost(postId)
    return response.data.data
  }
)
export const uploadImages = createAsyncThunk(
  "posts/uploadImages",
  async (data) => {
    const response = await postsApi.uploadImages(data)
    return response.data
  }
)

export default postsSlice
