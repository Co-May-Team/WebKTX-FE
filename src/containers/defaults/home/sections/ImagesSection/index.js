import { SwiperSlide } from 'swiper/react'
import { imageUrl } from '~/assets/images'
import { Swiper } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import DefaultSection from '../DefaultSection'
import styles from './index.module.scss'

const cx = bindClassNames(styles)
const data = [
    {
        id: Math.random(),
        url: imageUrl,
        alt: '',
    },
    {
        id: Math.random(),
        url: imageUrl,
        alt: '',
    },
    {
        id: Math.random(),
        url: imageUrl,
        alt: '',
    },
    {
        id: Math.random(),
        url: imageUrl,
        alt: '',
    },
    {
        id: Math.random(),
        url: imageUrl,
        alt: '',
    },
]

export default function ImagesSection() {
    const breakpoints = {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 4,
        },
    }
    const renderImages = () => {
        return (
            <Swiper spaceBetween={20} breakpoints={breakpoints}>
                {data.map((item) => (
                    <SwiperSlide key={item?.id}>
                        <div className={cx('image-item')}>
                            <img src={item?.url} alt={item?.alt} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        )
    }
    return (
        <DefaultSection title="HÌNH ẢNH CỎ MAY">
            <div className={cx('image-list')}>{renderImages()}</div>
        </DefaultSection>
    )
}
