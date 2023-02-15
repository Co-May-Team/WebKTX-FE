import moment from 'moment'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsCalendar4, BsFillTrash2Fill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Badge } from 'reactstrap'
import { Wrapper } from '~/components/Customs'
import Confirm from '~/components/Customs/Confirm'
import Pagination from '~/components/Pagination'
import SubmitPost from '~/containers/admin/Posts/SubmitPost'
import { deletePost, fetchPosts } from '~/store/posts/actions'
import { authSelector, postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function Introduces() {
    const userInfo = useSelector(authSelector).userInfo
    const listPost = useSelector(postsSelector).posts
    const pagination = useSelector(postsSelector).pagination

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [visibleFormEditPost, setVisibleFormEditPost] = useState(false)
    const [visibleDeletePost, setVisibleDeletePost] = useState(false)
    const [currentPost, setCurrentPost] = useState(null)

    const [filters, setFilters] = useState({
        category_id: 1,
        page: 1,
    })

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage,
        })
    }

    useEffect(() => {
        document.title = 'Giới thiệu - KTX Cỏ May'
        const params = queryString.parse(location.search)
        if (
            Object.keys(params).length > 1 ||
            (Object.keys(params).length > 0 && params.page !== '1')
        ) {
            setFilters(params)
        }
    }, [])
    useEffect(() => {
        const requestUrl =
            location.pathname + '?' + queryString.stringify(filters)
        dispatch(fetchPosts(filters))
        navigation(requestUrl)
    }, [filters])

    const handleDeletePost = () => {
        dispatch(deletePost(currentPost.postId))
    }

    const renderCardList = () => {
        return listPost.map((item) => (
            <div key={item.postId} className={cx('CardItem')}>
                <img
                    src={'data:image/png;base64,' + item.thumbnail}
                    alt="Thumbnail error"
                    className={cx('CardImg')}
                />
                <div className={cx('CardBody')}>
                    <NavLink
                        className={cx('CardTitle')}
                        to={`/post/${item.postId}`}
                    >
                        {item.title.slice(0, 82).trim()}...
                    </NavLink>
                    <div className={cx('CardInfo')}>
                        <Badge color="secondary" className={cx('CardTime')}>
                            <BsCalendar4 className="me-2" />
                            {moment(item.createdAt).locale('vi').format('llll')}
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
        <Wrapper>
            <div className={cx('Inner')}>
                <div className={cx('Heading')}>
                    <h3 className={cx('Title')}>Giới thiệu</h3>
                </div>
                <div className={cx('GridPosts')}>{renderCardList()}</div>
                <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
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
                        setVisible={() =>
                            setVisibleDeletePost(!visibleDeletePost)
                        }
                        title="Xóa bài đăng"
                        content="Bạn có chắc muốn xóa bài đăng này?"
                        onConfirm={handleDeletePost}
                    />
                )}
            </div>
        </Wrapper>
    )
}

export default Introduces
