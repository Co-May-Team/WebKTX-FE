import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthRoutes, DefaultRoutes, AdminRoutes } from '~/routes'
import useScrollToTop from './hooks/useScrollToTop'

export default function App() {
    useScrollToTop()
    return (
        <Routes>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/404" element={<div>NotFound</div>} />
            <Route path="/*" element={<DefaultRoutes />} />
        </Routes>
    )
}
