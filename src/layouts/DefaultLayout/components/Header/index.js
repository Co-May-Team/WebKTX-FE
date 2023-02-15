import { useRef, useState } from 'react'
import { BsLayoutTextSidebarReverse } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'

import { Wrapper } from '~/components/Customs'
import { LogoIcon } from '~/components/Icons'
import { useEventListener } from '~/hooks'
import { bindClassNames, handleClassName } from '~/utils'
import styles from './index.module.scss'
import Navbar from './Navbar'

const cx = bindClassNames(styles)

function Header() {
    const [isShow, setShow] = useState(false)
    const headerRef = useRef()

    const handleResize = () => {
        const mobileWidth = 768
        if (window.innerWidth > mobileWidth) {
            setShow(false)
        }
    }

    const handleScroll = () => {
        const top = 0
        const className = cx('Shrink')
        if (
            document.body.scrollTop > top ||
            document.documentElement.scrollTop > top
        ) {
            handleClassName.add(headerRef, className)
        } else {
            handleClassName.remove(headerRef, className)
        }
    }

    useEventListener('resize', handleResize)
    useEventListener('scroll', handleScroll)

    return (
        <header className={cx('Container')} ref={headerRef}>
            <Wrapper className={cx('Wrapper')}>
                {/* Logo */}
                <NavLink className={cx('LogoWrapper')} to="/">
                    {/* LogoIcon */}
                    <LogoIcon />
                    {/* Logo name */}
                    <div className={cx('LogoName')}>
                        <span>KÝ TÚC XÁ</span>
                        <span>Cỏ May</span>
                    </div>
                </NavLink>
                {/* Bars btn */}
                {!isShow && (
                    <Button
                        color="none"
                        className={cx('BarsIcon')}
                        onClick={() => setShow(true)}
                    >
                        {/* <FaBars /> */}
                        {/* <BsArrowBarLeft /> */}
                        {/* <BsFillBarChartFill /> */}
                        <BsLayoutTextSidebarReverse />
                    </Button>
                )}
                {/* Navbar */}
                <Navbar isShow={isShow} setShow={setShow} />
            </Wrapper>
        </header>
    )
}

export default Header
