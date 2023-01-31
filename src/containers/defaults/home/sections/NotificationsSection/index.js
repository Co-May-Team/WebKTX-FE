import 'moment/locale/vi'
import moment from 'moment/moment'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsCalendar4, BsFillTrash2Fill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import {
    Card,
    CardBody,
    CardFooter,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
} from 'reactstrap'
import { imageUrl } from '~/assets/images'
import { Button } from '~/components/Customs'
import ListPost from '~/containers/admin/Posts/ListPost'
import { postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import DefaultSection from '../DefaultSection'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function NotificationsSection(props) {
    const data = useSelector(postsSelector).posts
    return <ListPost data={data} categoryName="Thông báo" />
}

NotificationsSection.propTypes = {
    // data: PropTypes.object.isRequired,
}
