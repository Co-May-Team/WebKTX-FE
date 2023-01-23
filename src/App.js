import { Route, Routes } from 'react-router-dom'
import { AdminRoutes, AuthRoutes, DefaultRoutes } from '~/routes'
import useScrollToTop from './hooks/useScrollToTop'
import { path } from './utils'

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
