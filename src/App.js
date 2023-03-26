// import các module và file cần thiết
import { Route, Routes } from 'react-router-dom'
import { AdminRoutes, DefaultRoutes } from '~/routes'
import useScrollToTop from './hooks/useScrollToTop'

// component App chính của ứng dụng
export default function App() {
  // sử dụng custom hook để scroll về đầu trang khi chuyển đổi giữa các route
  useScrollToTop()
  return (
    // sử dụng Routes và Route của react-router-dom để quản lý các route của ứng dụng
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/404" element={<div>NotFound</div>} />
      <Route path="/*" element={<DefaultRoutes />} />
    </Routes>
  )
}
