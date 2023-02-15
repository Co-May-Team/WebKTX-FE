import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsCalendar4, BsFillTrash2Fill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Badge } from 'reactstrap'
import Confirm from '~/components/Customs/Confirm'
import { deletePost } from '~/store/posts/actions'
import { authSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import SubmitPost from '../SubmitPost'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function ListPost({ data }) {
    const userInfo = useSelector(authSelector).userInfo

    const dispatch = useDispatch()

    const [visibleFormEditPost, setVisibleFormEditPost] = useState(false)
    const [visibleDeletePost, setVisibleDeletePost] = useState(false)
    const [currentPost, setCurrentPost] = useState(null)

    const handleDeletePost = () => {
        dispatch(deletePost(currentPost.postId))
    }

    const renderCardList = () => {
        return data.map((item) => (
            <div key={item.postId} className={cx('CardItem')}>
                <img
                    src={'data:image/png;base64,' + item.thumbnail}
                    alt="Thumbnail error"
                    className={cx('CardImg')}
                />
                <div className={cx('CardBody')}>
                    <div className={cx('CardTitle')}>
                        {item.title.slice(0, 82).trim()}...
                    </div>
                    <div className={cx('CardInfo')}>
                        <Badge color="secondary" className={cx('CardTime')}>
                            <BsCalendar4 className="me-2" />
                            {moment(item.createdAt).locale('vi').format('llll')}
                        </Badge>
                        <Badge color="info" className="d-block">
                            {item.category.categoryName}
                        </Badge>
                    </div>
                    <div className={cx('Summary')}>
                        {item.summary.slice(0, 100).trim()}...
                    </div>
                </div>
                {userInfo?.id && (
                    <div className={cx('Action')}>
                        <div
                            className={cx('ActionItem')}
                            onClick={() => {
                                setVisibleFormEditPost(true)
                                setCurrentPost(item)
                            }}
                        >
                            <AiOutlineEdit /> Chỉnh sửa
                        </div>
                        <div
                            className={cx('ActionItem')}
                            onClick={() => {
                                setVisibleDeletePost(true)
                                setCurrentPost(item)
                            }}
                        >
                            <BsFillTrash2Fill /> Xóa
                        </div>
                    </div>
                )}
            </div>
        ))
    }
    return (
        <React.Fragment>
            <div className={cx('GridPosts')}>{renderCardList()}</div>
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
        </React.Fragment>
    )
}

ListPost.propTypes = {
    data: PropTypes.array.isRequired,
    categoryName: PropTypes.string,
}

export default ListPost
