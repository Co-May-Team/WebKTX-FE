import { bindClassNames } from '~/utils'
import styles from './Home.module.scss'
import {
    HeroSection,
    ImageSection,
    IntroSection,
    NotificationSection,
    VideoSection,
} from './sections'
import GoogleMapSection from './sections/google-map-section/GoogleMapSection'

const cx = bindClassNames(styles)

export default function Home() {
    return (
        <div className={cx('home-container')}>
            {/* Hero section */}
            <HeroSection />

            {/* Intro */}
            <div className={cx('space-between')}>
                <IntroSection />
            </div>

            {/* Notification */}
            <div className={cx('space-between')}>
                <NotificationSection />
            </div>

            {/* image */}
            <div className={cx('space-between')}>
                <ImageSection />
            </div>

            {/* Videos */}
            <div className={cx('space-between')}>
                <VideoSection />
            </div>

            {/* Google map */}
            <div
                style={{
                    height: '400px',
                    width: '100%',
                    position: 'relative',
                }}
            >
                <GoogleMapSection />
            </div>
        </div>
    )
}
