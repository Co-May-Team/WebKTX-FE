import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import {
    BsCalendar4,
    BsFillTrash2Fill,
    BsThreeDotsVertical,
} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
} from 'reactstrap'
import postsApi from '~/apis/postsApi'
import Confirm from '~/components/Customs/Confirm'
import {
    DefaultSection,
    NotificationsSection,
} from '~/containers/defaults/Home/sections'
import { deletePost } from '~/store/posts/actions'
import { authSelector, postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import SubmitPost from '../SubmitPost'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function ListPost({ data, categoryName }) {
    const userInfo = useSelector(authSelector).userInfo
    const dispatch = useDispatch()

    moment.locale('vi')

    const [visibleFormEditPost, setVisibleFormEditPost] = useState(false)
    const [visibleDeletePost, setVisibleDeletePost] = useState(false)
    const [currentPost, setCurrentPost] = useState(null)

    const handleDeletePost = () => {
        dispatch(deletePost(currentPost.postId))
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
                    <CardBody>
                        <CardTitle className={cx('card-title')}>
                            {item.title}
                        </CardTitle>
                        <CardSubtitle className={cx('card-subtitle')}>
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
                                    onClick={() => {
                                        setVisibleFormEditPost(true)
                                        setCurrentPost(item)
                                    }}
                                >
                                    <AiOutlineEdit /> Chỉnh sửa
                                </div>
                                |
                                <div
                                    className={cx('action-item')}
                                    onClick={() => {
                                        setVisibleDeletePost(true)
                                        setCurrentPost(item)
                                    }}
                                >
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
            {visibleDeletePost && (
                <Confirm
                    visible={visibleDeletePost}
                    setVisible={() => setVisibleDeletePost(!visibleDeletePost)}
                    title="Xóa bài đăng"
                    content="Bạn có chắc muốn xóa bài đăng này?"
                    onConfirm={handleDeletePost}
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
