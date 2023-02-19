import { memo, useEffect, useRef } from 'react'
import { MdCloseFullscreen } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'

import { useClickOutside } from '~/hooks'
import Account from '~/layouts/AdminLayout/components/Header/Account'
import { authSelector, tagsSelector } from '~/store/selectors'
import { fetchTags } from '~/store/tags/actions'
import { bindClassNames, handleClassName, path } from '~/utils'
import convertToUrl from '~/utils/commons/convertToUrl'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function Navbar({ isShow, setShow }) {
    const userInfo = useSelector(authSelector).userInfo
    const tagList = useSelector(tagsSelector).tags

    const dispatch = useDispatch()
    const navbarRef = useRef()
    const overlayRef = useRef()

    const renderNavList = () => {
        return tagList.map((tagItem) => (
            <NavLink
                to={convertToUrl(tagItem.tagName)}
                key={tagItem.tagId}
                className={({ isActive }) =>
                    cx('NavItem', { Active: isActive })
                }
                onClick={() => setShow(false)}
            >
                {tagItem.tagName}
            </NavLink>
        ))
    }

    useClickOutside(navbarRef, () => setShow(false))

    useEffect(() => {
        dispatch(fetchTags())
    }, [])

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
            <NavLink
                to="/"
                key="home"
                className={({ isActive }) =>
                    cx('NavItem', { Active: isActive })
                }
                onClick={() => setShow(false)}
            >
                Trang chủ
            </NavLink>
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
