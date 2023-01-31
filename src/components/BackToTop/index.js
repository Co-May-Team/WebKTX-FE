import { useRef } from 'react'
import { RxChevronUp } from 'react-icons/rx'

import { Button } from '~/components/Customs'
import { useEventListener } from '~/hooks'
import { bindClassNames, handleClassName } from '~/utils'
import styles from './index.module.scss'

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
            onClick={handleScrollTo}
        >
            <RxChevronUp />
        </Button>
    )
}
