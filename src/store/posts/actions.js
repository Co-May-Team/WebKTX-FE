import { createAsyncThunk } from '@reduxjs/toolkit'
import postsApi from '~/services/postsApi'
import postsSlice from './slice'

export const { addPostToList, updatePostList } = postsSlice.actions

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (params) => {
    const response = await postsApi.getAll(params.params, params.filters)
    return response.data.data
  }
)
export const loadMorePosts = createAsyncThunk(
  'posts/loadMorePosts',
  async (params) => {
    const response = await postsApi.getAll(params.params, params.filters)
    return response.data.data
  }
)
export const addPost = createAsyncThunk('posts/addPost', async (postInfo) => {
  const response = await postsApi.addPost(postInfo)
  return response.data
})
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (postInfo) => {
    const response = await postsApi.updatePost(postInfo)
    return response.data
  }
)
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    const response = await postsApi.deletePost(postId)
    return { ...response.data, postId: postId }
  }
)
export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ postId, like }) => {
    const response = await postsApi.likePost(postId)
    return response.data.data
  }
)
export const uploadImages = createAsyncThunk(
  'posts/uploadImages',
  async (data) => {
    const response = await postsApi.uploadImages(data)
    return response.data
  }
)
