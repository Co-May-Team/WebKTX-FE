import { useRef, useState } from 'react'
import { BsLayoutTextSidebarReverse } from 'react-icons/bs'

import { useEventListener } from '~/hooks'
import Navbar from './navbar/Navbar'
import { Wrapper, Button } from '~/components/customs'
import { bindClassNames, handleClassName } from '~/utils'
import styles from './Header.module.scss'
import Logo from '~/components/logo/Logo'

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
        const className = cx('shrink')
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
        <header className={cx('container')} ref={headerRef}>
            <Wrapper className={cx('wrapper')}>
                {/* Logo */}
                <Logo />
                {/* Bars btn */}
                {!isShow && (
                    <Button
                        className={cx('bars-icon')}
                        onClick={() => setShow(true)}>
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
