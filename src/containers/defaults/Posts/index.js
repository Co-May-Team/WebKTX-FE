import moment from 'moment'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsCalendar4, BsFillTrash2Fill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Badge } from 'reactstrap'
import { Wrapper } from '~/components/Customs'
import Confirm from '~/components/Customs/Confirm'
import Pagination from '~/components/Pagination'
import SubmitPost from '~/containers/admin/Posts/SubmitPost'
import { deletePost, fetchPosts } from '~/store/posts/actions'
import { authSelector, postsSelector, tagsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import convertToUrl from '~/utils/commons/convertToUrl'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function Posts() {
    const tagList = useSelector(tagsSelector).tags
    const listPost = useSelector(postsSelector).posts
    const pagination = useSelector(postsSelector).pagination

    const dispatch = useDispatch()
    const url = useParams().url
    const location = useLocation()
    const navigation = useNavigate()

    const [tagInfo, setTagInfo] = useState(null)
    const [visibleFormEditPost, setVisibleFormEditPost] = useState(false)
    const [visibleDeletePost, setVisibleDeletePost] = useState(false)
    const [currentPost, setCurrentPost] = useState(null)

    const [params, setParams] = useState({
        page: 1,
    })
    const [filters, setFilters] = useState(null)

    const handlePageChange = (newPage) => {
        setParams({
            ...params,
            page: newPage,
        })
    }
    const searchTagByUrl = () => {
        return tagList.filter(tag => convertToUrl(tag?.tagName) === url)[0]
    }
    document.title = tagInfo?.tagName ? `${tagInfo?.tagName} - KTX Cỏ May` : "KTX Cỏ May"
    useEffect(() => {
        const tag = searchTagByUrl()
        setTagInfo(tag)
        setFilters({
            tag_id: tag.tagId
        })
    }, [url])
    useEffect(() => {
        const params = queryString.parse(location.search)
        if (
            Object.keys(params).length > 1 ||
            (Object.keys(params).length > 0 && params.page !== '1')
        ) {
            setParams(params)
        }
    }, [])
    useEffect(() => {
        const requestUrl =
            location.pathname + '?' + queryString.stringify(params)
        dispatch(fetchPosts({ params, filters }))
        navigation(requestUrl)
    }, [params, filters])

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
                        {item.summary}...
                    </div>
                </div>
            </div>
        ))
    }
    return (
        <Wrapper>
            <div className={cx('Inner')}>
                <div className={cx('Heading')}>
                    <h3 className={cx('Title')}>{tagInfo?.tagName}</h3>
                </div>
                {listPost && listPost.length > 0 ? (
                    <>
                        <div className={cx('GridPosts')}>
                            {renderCardList()}
                        </div>
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="text-center">
                        Trống
                    </div>
                )
                }
            </div>
        </Wrapper>
    )
}

export default Posts
