import PropTypes from "prop-types"
import ScrollToTop from "~/components/ScrollToTop"
import { Footer, Header } from "./components"

export default function DefaultLayout({ children }) {
  return (
    <div className='bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
      {/* Header */}
      <Header />
      {/* Container */}
      <div>{children}</div>
      {/* Footer */}
      <Footer />
      {/* Back To Top */}
      <ScrollToTop />
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
