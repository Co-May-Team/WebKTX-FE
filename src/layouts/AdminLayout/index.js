/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BackToTop } from '~/components'
import { useEventListener } from '~/hooks'
import { authSelector } from '~/store/selectors'
import { bindClassNames, handleClassName } from '~/utils'
import { Header, Sidebar } from './components'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function AdminLayout({ children }) {
    const status = useSelector(authSelector).status
    const userInfo = useSelector(authSelector).userInfo
    const navigate = useNavigate()
    const containerRef = useRef()

    useEffect(() => {
        if (!userInfo?.id) {
            navigate('/auth/login')
        }
    }, [])

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

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
