import PropTypes from "prop-types"
import ScrollToTop from "~/components/ScrollToTop"
import { Footer, Header } from "./components"

export default function AdminLayout({ children }) {
  return (
    <div className='bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
      {/* Header */}
      <Header />
      {/* Container */}
      {/* <div className='container py-10 lg:py-16'>{children}</div> */}
      <div className='py-10 lg:py-16'>{children}</div>
      {/* Footer */}
      <Footer />
      {/* Back To Top */}
      <ScrollToTop />
    </div>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
