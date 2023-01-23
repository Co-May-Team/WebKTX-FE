import { imageUrl } from '~/assets/images'
import { Button } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import { NotificationsSection } from '../../Home/sections'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function Introduces() {
    return <NotificationsSection />
}
