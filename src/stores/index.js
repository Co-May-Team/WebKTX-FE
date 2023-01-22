import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth/slice'
import postsSlice from './posts/slice'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        posts: postsSlice.reducer,
    },
})

export default store
