import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import {
    BsCalendar4,
    BsFillTrash2Fill,
    BsThreeDotsVertical,
} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
} from 'reactstrap'
import Table from '~/components/Customs/Table'
import {
    DefaultSection,
    NotificationsSection,
} from '~/containers/defaults/Home/sections'
import { authSelector, postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import SubmitPost from '../SubmitPost'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function ListPost({ data, categoryName }) {
    const userInfo = useSelector(authSelector).userInfo

    moment.locale('vi')

    const [visibleFormEditPost, setVisibleFormEditPost] = useState(false)
    const [currentPost, setCurrentPost] = useState(null)

    const handleShowFormEditPost = (post) => {
        setVisibleFormEditPost(true)
        setCurrentPost(post)
    }

    const renderCardList = () => {
        return data
            .filter((item) => item.categoryName.includes(categoryName))
            .map((item) => (
                <Card key={item.postId} className={cx('card-item')}>
                    <CardImg
                        src={'data:image/png;base64,' + item.thumbnail}
                        className={cx('card-img')}
                    />
                    <CardBody className={cx('card-body')}>
                        <CardTitle tag="h4" className={cx('card-title')}>
                            {item.title}
                        </CardTitle>
                        <CardSubtitle tag="h6" className={cx('card-subtitle')}>
                            <span className={cx('create-time')}>
                                <BsCalendar4 className="me-2" />
                                {moment(item.createAt).format('llll')}
                            </span>
                            |
                            <span className={cx('category-name')}>
                                {item.categoryName}
                            </span>
                        </CardSubtitle>
                        <CardText className={cx('summary')}>
                            {item.summary}
                        </CardText>
                        {userInfo?.id && (
                            <div className={cx('action')}>
                                <div
                                    className={cx('action-item')}
                                    onClick={() => handleShowFormEditPost(item)}
                                >
                                    <AiOutlineEdit /> Chỉnh sửa
                                </div>
                                |
                                <div className={cx('action-item')}>
                                    <BsFillTrash2Fill /> Xóa
                                </div>
                            </div>
                        )}
                    </CardBody>
                </Card>
            ))
    }
    return (
        <DefaultSection title={categoryName}>
            <div className={cx('body')}>{renderCardList()}</div>
            {visibleFormEditPost && (
                <SubmitPost
                    visible={visibleFormEditPost}
                    setVisible={() =>
                        setVisibleFormEditPost(!visibleFormEditPost)
                    }
                    post={currentPost}
                />
            )}
        </DefaultSection>
    )
}

ListPost.propTypes = {
    data: PropTypes.array.isRequired,
    categoryName: PropTypes.string,
}

export default ListPost
