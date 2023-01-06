import React, { useRef } from 'react'
import { HiArrowSmUp } from 'react-icons/hi'

import { Button } from '~/components/customs'
import { useEventListener } from '~/hooks'
import { bindClassNames, handleClassName } from '~/utils'
import styles from './BackToTop.module.scss'

const cx = bindClassNames(styles)

export default function BackToTop() {
    const backToTopRef = useRef()

    const handleScroll = () => {
        const headerheight = 80
        const className = cx('visible')
        if (
            document.body.scrollTop > headerheight ||
            document.documentElement.scrollTop > headerheight
        ) {
            handleClassName.add(backToTopRef, className)
        } else {
            handleClassName.remove(backToTopRef, className)
        }
    }

    const handleScrollTo = () => window.scrollTo(0, 0)

    useEventListener('scroll', handleScroll)

    return (
        <Button
            className={cx('back-to-top')}
            ref={backToTopRef}
            onClick={handleScrollTo}>
            <HiArrowSmUp />
        </Button>
    )
}
