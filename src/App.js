// import các module và file cần thiết
import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"
import useScrollToTop from "./hooks/useScrollToTop"
import AdminRoutes from "./routes/AdminRoutes"
import DefaultRoutes from "./routes/DefaultRoutes"

export default function App() {
  const location = useLocation()
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
