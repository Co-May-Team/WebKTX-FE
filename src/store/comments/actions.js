import { createAsyncThunk } from "@reduxjs/toolkit"
import commentsApi from "~/services/commentsApi"
import commentsSlice from "./slice"

export const { addCommentToList, updateCommentList } = commentsSlice.actions

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (params) => {
    const response = await commentsApi.getCommentList(params)
    return { comments: response.data.data, postId: params.postId }
  }
)
export const loadMoreComments = createAsyncThunk(
  "comments/loadMoreComments",
  async (params) => {
    const response = await commentsApi.getAll(params)
    return response.data.data
  }
)
export const addComment = createAsyncThunk(
  "comments/addComment",
  async (commentInfo) => {
    const response = await commentsApi.addComment(commentInfo)
    return response.data
  }
)
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (commentInfo) => {
    const response = await commentsApi.updateComment(commentInfo)
    return response.data
  }
)
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId) => {
    const response = await commentsApi.deleteComment(commentId)
    return { ...response.data, commentId: commentId }
  }
)
export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async ({ commentId, like }) => {
    // const response = await commentsApi.likeComment(commentId)
    // return response.data.data
  }
)
