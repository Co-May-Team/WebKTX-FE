import { memo, useEffect, useRef } from 'react'
import { MdCloseFullscreen } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'

import { useClickOutside } from '~/hooks'
import Account from '~/layouts/AdminLayout/components/Header/Account'
import { authSelector } from '~/store/selectors'
import { bindClassNames, handleClassName, path } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)
const navList = [
    { id: Math.random(), display: 'Trang chủ', to: path.HOME },
    { id: Math.random(), display: 'Giới thiệu', to: path.INTRODUCES },
    { id: Math.random(), display: 'Thông báo', to: path.NOTIFICATIONS },
    { id: Math.random(), display: 'Tin tức', to: path.NEWS },
    { id: Math.random(), display: 'Biểu mẫu', to: path.FORMS },
]

function Navbar({ isShow, setShow }) {
    const userInfo = useSelector(authSelector).userInfo

    const navbarRef = useRef()
    const overlayRef = useRef()

    const renderNavList = () => {
        return navList.map((item) => (
            <NavLink
                to={item.to}
                key={item.id}
                className={({ isActive }) =>
                    cx('NavItem', { Active: isActive })
                }
                onClick={() => setShow(false)}
            >
                {item.display}
            </NavLink>
        ))
    }

    useClickOutside(navbarRef, () => setShow(false))

    useEffect(() => {
        const className = cx('Visible')
        if (isShow) {
            handleClassName.add(navbarRef, className)
            handleClassName.add(overlayRef, className)
            Object.assign(document.body.style, {
                overflow: 'hidden',
            })
        } else {
            handleClassName.remove(navbarRef, className)
            handleClassName.remove(overlayRef, className)
            Object.assign(document.body.style, {
                overflowY: 'scroll',
            })
        }
    }, [isShow])

    return (
        <>
            <div className={cx('Container')} ref={navbarRef}>
                <nav className={cx('NavWrapper')}>
                    {renderNavList()}
                    {userInfo?.id && <Account />}
                </nav>
                <Button
                    color="none"
                    className={cx('Close')}
                    onClick={() => setShow(false)}
                >
                    {/* <VscChromeClose /> */}
                    <MdCloseFullscreen />
                </Button>
            </div>
            <div className={cx('Overlay')} ref={overlayRef}></div>
        </>
    )
}

export default memo(Navbar)
