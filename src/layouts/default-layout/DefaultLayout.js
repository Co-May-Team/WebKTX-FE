import PropTypes from 'prop-types'
import { useRef } from 'react'
import { BackToTop } from '~/components'
import { useEventListener } from '~/hooks'
import { bindClassNames, handleClassName } from '~/utils'
import { Footer, Header } from './components'
import styles from './DefaultLayout.module.scss'

const cx = bindClassNames(styles)

export default function DefaultLayout({ children }) {
    const containerRef = useRef()
    useEventListener('scroll', () => {
        if (
            document.body.scrollTop > 0 ||
            document.documentElement.scrollTop > 0
        ) {
            handleClassName.add(containerRef, cx('padding-top'))
        } else {
            handleClassName.remove(containerRef, cx('padding-top'))
        }
    })
    return (
        <div className={cx('container')}>
            {/* Header */}
            <Header />
            {/* Container */}
            <div className={cx('content')} ref={containerRef}>
                {children}
            </div>
            {/* Footer */}
            <Footer />
            {/* Back To Top */}
            <BackToTop />
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
