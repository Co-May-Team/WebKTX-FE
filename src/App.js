// import các module và file cần thiết
import { AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import useScrollToTop from "./hooks/useScrollToTop"
import AdminRoutes from "./routes/AdminRoutes"
import DefaultRoutes from "./routes/DefaultRoutes"

const APP_VERSION = "1.0.1" // Phiên bản hiện tại của ứng dụng

function checkAppVersion() {
  const storedVersion = localStorage.getItem("APP_VERSION")
  if (storedVersion !== APP_VERSION) {
    // Xóa dữ liệu trong localStorage
    localStorage.clear()
    window.location.reload()

    // Cập nhật giá trị của biến phiên bản trong localStorage
    localStorage.setItem("APP_VERSION", APP_VERSION)
  }
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    checkAppVersion()
  }, [])

  useScrollToTop()
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/404' element={<div>NotFound</div>} />
        <Route path='/*' element={<DefaultRoutes />} />
      </Routes>
    </AnimatePresence>
  )
}
