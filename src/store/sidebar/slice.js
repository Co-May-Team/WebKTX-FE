const { createSlice } = require('@reduxjs/toolkit')

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        sidebarShow: true,
        sidebarBackdropShow: true,
        sidebarUnfoldable: false,
    },
    reducers: {
        toggleSidebarShow: (state) => {
            state.sidebarShow = !state.sidebarShow
        },
        toggleSidebarBackdropShow: (state, action) => {
            state.sidebarBackdropShow = action.payload
        },
        toggleSidebarUnfoldable: (state) => {
            state.sidebarUnfoldable = !state.sidebarUnfoldable
        },
    },
})

export default sidebarSlice
