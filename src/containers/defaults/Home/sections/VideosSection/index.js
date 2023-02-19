import { SwiperSlide } from 'swiper/react'
import { Swiper, Wrapper } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function VideosSection() {
    const data = [
        {
            id: 1,
            title: "[05/2017] - Ký túc xá Cỏ May học tập thực tế tại doanh nghiệp Cỏ May - tỉnh Đồng Tháp",
            src: "https://www.youtube.com/embed/-taMLkDG_ao",
        },
        {
            id: 2,
            title: "Phóng sự Ký túc xá Cỏ May trên kênh Camera Cận Cảnh",
            src: "https://www.youtube.com/embed/lptvIdwU-NI",
        }
    ]
    const breakpoints = {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
    const renderVideosCard = () => {
        return (
            <Swiper spaceBetween={20} breakpoints={breakpoints}>
                {data.map((item) => (
                    <SwiperSlide key={item}>
                        <div className={cx('video-item')}>
                            <iframe
                                className={cx('video-frame')}
                                src={item.src}
                                title={item.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <p className={cx('video-title')}>
                                {item.title}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        )
    }
    return (
        <Wrapper>
            <div className={cx('Inner')}>
                <div className={cx('Heading')}>
                    <h3 className={cx('Title')}>Video Cỏ May</h3>
                </div>
                <div className={cx('body')}>{renderVideosCard()}</div>
            </div>
        </Wrapper>
    )
}
