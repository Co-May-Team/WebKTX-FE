import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { BackToTop } from '~/components'
import { Footer, Header } from './components'

export default function AdminLayout({ children }) {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      {/* Header */}
      <Header />
      {/* Container */}
      <div className="container py-10 lg:py-16">{children}</div>
      {/* Footer */}
      <Footer />
      {/* Back To Top */}
      <BackToTop />
      <Outlet />
    </div>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
