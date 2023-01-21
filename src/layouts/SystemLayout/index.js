import PropTypes from 'prop-types'
import { useRef } from 'react'
import { BackToTop } from '~/components'
import { useEventListener } from '~/hooks'
import { bindClassNames, handleClassName } from '~/utils'
import { Header, Sidebar } from './components'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function SystemLayout({ children }) {
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
            {/* Sidebar */}
            <Sidebar />
            {/* Container */}
            <div className={cx('content')} ref={containerRef}>
                {children}
            </div>
            {/* Back To Top */}
            <BackToTop />
        </div>
    )
}

SystemLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
