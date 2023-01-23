import { memo, useEffect, useRef } from 'react'
import { MdCloseFullscreen } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

import { Button } from '~/components/Customs'
import { useClickOutside } from '~/hooks'
import Account from '~/layouts/AdminLayout/components/Header/Account'
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
    const navbarRef = useRef()
    const overlayRef = useRef()

    const renderNavList = () => {
        return navList.map((item) => (
            <NavLink
                to={item.to}
                key={item.id}
                className={({ isActive }) =>
                    cx('nav-item', { active: isActive })
                }
                onClick={() => setShow(false)}
            >
                {item.display}
            </NavLink>
        ))
    }

    useClickOutside(navbarRef, () => setShow(false))

    useEffect(() => {
        const className = cx('visible')
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
            <div className={cx('navbar')} ref={navbarRef}>
                <nav className={cx('main-nav')}>
                    {renderNavList()}
                    <Account />
                </nav>
                <Button className={cx('close')} onClick={() => setShow(false)}>
                    {/* <VscChromeClose /> */}
                    <MdCloseFullscreen />
                </Button>
            </div>
            <div className={cx('overlay')} ref={overlayRef}></div>
        </>
    )
}

export default memo(Navbar)
