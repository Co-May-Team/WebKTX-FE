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
import convertToUrl from '~/utils/commons/convertToUrl'
import randomColor from '~/utils/commons/randomColor'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function PostsSection() {
    const listPost = useSelector(postsSelector).posts
    const pagination = useSelector(postsSelector).pagination
    const userInfo = useSelector(authSelector).userInfo

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [params, setParams] = useState({
        page: 1,
    })

    const handlePageChange = (newPage) => {
        setParams({
            ...params,
            page: newPage,
        })
    }
    useEffect(() => {
        const requestUrl =
            location.pathname + '?' + queryString.stringify(params)
        dispatch(fetchPosts({ params, filters: {} }))
        navigation(requestUrl)
    }, [params])

    const renderCardList = () => {
        return listPost.map((item, index) => (
                <div key={item.postId} className={cx('Card')}>
                    <NavLink
                        className={cx('CardImg')}
                        to={`/${convertToUrl(item.title)}/${item.postId}`}
                    >
                        <img src={item.thumbnail} alt="Thumbnail" />
                    </NavLink>
                    <div className={cx('CardBody')}>
                        <NavLink
                            to={`/${convertToUrl(item.title)}/${item.postId}`}
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
                        <small className={cx('CardDescription')}>
                            {item.summary.trim()}
                        </small>
                    </div>
                </div>
        ))
    }
    return (
        <Wrapper>
            <div className={cx('Inner')}>
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
