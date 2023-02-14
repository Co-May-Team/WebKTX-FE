import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '~/store/posts/actions'
import { postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'
import { HeroSection, ImagesSection, VideosSection } from './sections'

const cx = bindClassNames(styles)

export default function Home() {
    const posts = useSelector(postsSelector).posts
    console.log(posts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPosts())
    }, [])
    return (
        <div className={cx('home-container')}>
            {/* Hero section */}
            <HeroSection />

            {/* image */}
            <div className={cx('space-between')}>
                <ImagesSection />
            </div>

            {/* Videos */}
            <div className={cx('space-between')}>
                <VideosSection />
            </div>

            {/* Google map */}
        </div>
    )
}
