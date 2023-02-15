import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import authSlice from './auth/slice'
import postsSlice from './posts/slice'
import sidebarSlice from './sidebar/slice'

const reducers = combineReducers({
    sidebar: sidebarSlice.reducer,
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
})

export default store
