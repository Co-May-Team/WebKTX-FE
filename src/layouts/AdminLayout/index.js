/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BackToTop } from '~/components'
import { authSelector } from '~/store/selectors'
import { Header, Sidebar } from './components'
import './index.scss'

export default function AdminLayout({ children }) {
    const userInfo = useSelector(authSelector).userInfo
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo?.id) {
            navigate('/auth/login')
        }
    }, [])

    return (
        <div>
            {/* Sidebar */}
            <Sidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                {/* Header */}
                <Header />
                <div className="body flex-grow-1 px-3">
                    {children}
                    {/* Back To Top */}
                    <BackToTop />
                </div>
            </div>
        </div>
    )
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
