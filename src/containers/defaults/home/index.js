import { bindClassNames } from '~/utils'
import styles from './index.module.scss'
import {
    HeroSection,
    ImagesSection,
    IntroducesSection,
    NotificationsSection,
    VideosSection,
} from './sections'

const cx = bindClassNames(styles)

export default function Home() {
    return (
        <div className={cx('home-container')}>
            {/* Hero section */}
            <HeroSection />

            {/* Intro */}
            <div className={cx('space-between')}>
                <IntroducesSection />
            </div>

            {/* Notification */}
            <div className={cx('space-between')}>
                <NotificationsSection />
            </div>

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
