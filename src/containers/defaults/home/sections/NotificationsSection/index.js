import 'moment/locale/vi'
import moment from 'moment/moment'
import { BsCalendar4 } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
} from 'reactstrap'
import { imageUrl } from '~/assets/images'
import { Button } from '~/components/Customs'
import { postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import DefaultSection from '../DefaultSection'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function NotificationsSection(props) {
    moment.locale('vi')
    const data = useSelector(postsSelector).posts
    const renderCardList = () => {
        return data.map((item) => (
            <Card key={item.id} className={cx('card-item')}>
                <CardImg src={imageUrl} alt="" className={cx('card-img')} />
                <CardBody className={cx('card-body')}>
                    <CardTitle tag="h4" className={cx('card-title')}>
                        {item.title}
                    </CardTitle>
                    <CardSubtitle tag="h6" className={cx('card-subtitle')}>
                        <BsCalendar4 />
                        <span>{moment(item.createDate).format('llll')}</span>
                    </CardSubtitle>
                    <CardText className={cx('card-text')}>
                        {item.content.slice(0, 200) + '...'}
                    </CardText>
                    <Button className={cx('more-btn')}>Đọc thêm</Button>
                </CardBody>
            </Card>
        ))
    }
    return (
        <DefaultSection title="THÔNG BÁO MỚI">
            <div className={cx('body')}>{renderCardList()}</div>
        </DefaultSection>
    )
}

NotificationsSection.propTypes = {
    // data: PropTypes.object.isRequired,
}
