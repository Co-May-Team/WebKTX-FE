// import các module và file cần thiết
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import useScrollToTop from './hooks/useScrollToTop'
import AdminRoutes from './routes/AdminRoutes'
import DefaultRoutes from './routes/DefaultRoutes'

export default function App() {
  const location = useLocation()
  useScrollToTop()
  return (
    // <TransitionGroup>
    //   <CSSTransition key={location.key} classNames="slide" timeout={300}>
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/404" element={<div>NotFound</div>} />
      <Route path="/*" element={<DefaultRoutes />} />
    </Routes>
    //   </CSSTransition>
    // </TransitionGroup>
  )
}
