import { dormitory1, dormitory2, dormitory3 } from '~/assets/images'
import { Swiper } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const imageUrl = `http://ktx.hust.edu.vn/wp-content/uploads/2019/05/2.9.jpg`
const cx = bindClassNames(styles)
const data = [
    {
        id: Math.random(),
        url: dormitory1,
        alt: '',
    },
    {
        id: Math.random(),
        url: dormitory2,
        alt: '',
    },
    {
        id: Math.random(),
        url: dormitory3,
        alt: '',
    },
]

export default function HeroSection() {
    return <Swiper data={data} />
}
