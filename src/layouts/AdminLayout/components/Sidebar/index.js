import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '~/components/Logo'
import { useEventListener } from '~/hooks'
import { sidebarSelector } from '~/store/selectors'
import { toggleSidebarUnfoldable } from '~/store/sidebar/actions'
import ListItem from './ListItem'
import listSidebarItem from './listSidebarItem'

function Sidebar() {
    const sidebarUnfoldable = useSelector(sidebarSelector).sidebarUnfoldable
    const sidebarShow = useSelector(sidebarSelector).sidebarShow
    const sidebarBackdropShow = useSelector(sidebarSelector).sidebarBackdropShow

    const dispatch = useDispatch()

    return (
        <div
            className={
                sidebarShow && !sidebarUnfoldable
                    ? 'sidebar sidebar-fixed'
                    : sidebarShow && sidebarUnfoldable
                        ? 'sidebar sidebar-fixed sidebar-narrow-unfoldable'
                        : sidebarShow && sidebarBackdropShow ? 'sidebar sidebar-fixed show' : 'sidebar sidebar-fixed hide'
            }
        >
            <div className="sidebar-brand d-none d-md-flex" to="/">
                <Logo />
            </div>
            <ul className="sidebar-nav">
                <div className="simplebar-wrapper" style={{ margin: '0px' }}>
                    <div className="simplebar-height-auto-observer-wrapper">
                        <div className="simplebar-height-auto-observer" />
                    </div>
                </div>
                <div className="simplebar-mask">
                    <div
                        className="simplebar-offset"
                        style={{ right: '0px', bottom: '0px' }}
                    >
                        <div
                            className="simplebar-content-wrapper"
                            style={{ height: 'auto', overflow: 'hidden' }}
                        >
                            <div
                                className="simplebar-content"
                                style={{ padding: '0px' }}
                            >
                                <ListItem items={listSidebarItem} />
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
            <button
                className="sidebar-toggler d-none d-lg-flex"
                onClick={() => dispatch(toggleSidebarUnfoldable())}
            />
        </div>
    )
}

export default Sidebar
