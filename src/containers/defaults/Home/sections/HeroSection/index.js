import { Swiper } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const imageUrl = `http://ktx.hust.edu.vn/wp-content/uploads/2019/05/2.9.jpg`
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
]

export default function HeroSection() {
    return (
        <div className={cx('_container')}>
            <Swiper data={data} />
        </div>
    )
}
