import { useRef, useState } from 'react'
import { BsLayoutTextSidebarReverse } from 'react-icons/bs'

import { useEventListener } from '~/hooks'
import { Wrapper, Button } from '~/components/customs'
import { bindClassNames, handleClassName } from '~/utils'
import styles from './index.module.scss'
import Logo from '~/components/logo/Logo'
import Account from './Account'

const cx = bindClassNames(styles)

function Header() {
    return (
        <header className={cx('container')}>
            <Wrapper className={cx('wrapper')}>
                <Account />
            </Wrapper>
        </header>
    )
}

export default Header
