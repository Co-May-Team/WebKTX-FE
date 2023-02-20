import moment from 'moment'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Badge, ListGroup, ListGroupItem } from 'reactstrap'
import newIcon from '~/assets/icons/new.gif'
import { Wrapper } from '~/components/Customs'
import Pagination from '~/components/Pagination'
import { fetchPosts } from '~/store/posts/actions'
import { authSelector, postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import randomColor from '~/utils/commons/randomColor'
import defaultThumbnail from '~/utils/constants/defaultThumbnail'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function PostsSection() {
    const listPost = useSelector(postsSelector).posts
    const pagination = useSelector(postsSelector).pagination
    const userInfo = useSelector(authSelector).userInfo

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [filters, setFilters] = useState({
        page: 1,
    })

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage,
        })
    }
    useEffect(() => {
        const requestUrl =
            location.pathname + '?' + queryString.stringify(filters)
        dispatch(fetchPosts(filters))
        navigation(requestUrl)
    }, [filters])

    const renderCardList = () => {
        return listPost.map((item, index) => (
            <ListGroupItem key={item.postId}>
                <div className={cx('Card')}>
                    <NavLink
                        className={cx('CardImg')}
                        to={`/post/${item.postId}`}
                    >
                        <img
                            src={'data:image/png;base64,' + item.thumbnail}
                            onError={`this.src='data:image/png;base64,${defaultThumbnail};'`}
                            alt="Thumbnail"
                        />
                    </NavLink>
                    <div className={cx('CardBody')}>
                        <NavLink
                            to={`/post/${item.postId}`}
                            className="fw-bold"
                        >
                            {' '}
                            {item.title} {index === 0 && <img src={newIcon} />}
                        </NavLink>
                        <br />
                        <Badge color={randomColor()} className="me-2">
                            {item.category.categoryName}
                        </Badge>
                        |
                        <small style={{ color: 'gray', marginLeft: '.5rem' }}>
                            {moment(item.createdAt).locale('vi').fromNow()}
                        </small>
                        <br />
                        <small class={cx('CardDescription')}>
                            {item.summary.trim()}
                        </small>
                    </div>
                </div>
            </ListGroupItem>
        ))
    }
    return (
        <Wrapper>
            <div className={cx('Inner')}>
                <div className={cx('Heading')}>
                    <h3 className={cx('Title')}>Tất cả bài viết</h3>
                </div>
                <div className={cx('body')}>
                    <ListGroup className="gap-3 mb-3">
                        {renderCardList()}
                    </ListGroup>
                    <Pagination
                        pagination={pagination}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </Wrapper>
    )
}

export default PostsSection
