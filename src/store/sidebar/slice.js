const { createSlice } = require('@reduxjs/toolkit')

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        sidebarShow: true,
        sidebarUnfoldable: false,
    },
    reducers: {
        toggleSidebarShow: (state) => {
            state.sidebarShow = !state.sidebarShow
        },
        toggleSidebarUnfoldable: (state) => {
            state.sidebarUnfoldable = !state.sidebarUnfoldable
        },
    },
})

export default sidebarSlice
