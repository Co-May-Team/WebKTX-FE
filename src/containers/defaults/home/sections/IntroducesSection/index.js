// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { imageUrl } from '~/assets/images'
import { Button } from '~/components/Customs'
import ListPost from '~/containers/admin/Posts/ListPost'
import { postsSelector } from '~/store/selectors'
import { bindClassNames, path } from '~/utils'
import DefaultSection from '../DefaultSection'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function IntroduceSection() {
    const data = useSelector(postsSelector).posts
    return <ListPost data={data} categoryName="Giới thiệu" />
}

IntroduceSection.propTypes = {}
