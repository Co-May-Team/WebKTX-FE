/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { BsCalendar4 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Badge, Spinner } from 'reactstrap'
import { Wrapper } from '~/components/Customs'
import Pagination from '~/components/Pagination'
import { fetchPosts } from '~/store/posts/actions'
import { postsSelector, tagsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import convertToUrl from '~/utils/commons/convertToUrl'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function Posts() {
    const tagList = useSelector(tagsSelector).tags
    const status = useSelector(postsSelector).status
    const listPost = useSelector(postsSelector).posts
    const pagination = useSelector(postsSelector).pagination

    const dispatch = useDispatch()
    const url = useParams().url
    const location = useLocation()
    const navigation = useNavigate()

    const [tagInfo, setTagInfo] = useState(null)

    const [params, setParams] = useState({
        page: 1,
    })
    const [filters, setFilters] = useState({})

    const handlePageChange = (newPage) => {
        setParams({
            ...params,
            page: newPage,
        })
    }
    const searchTagByUrl = () => {
        return tagList.filter((tag) => convertToUrl(tag?.tagName) === url)[0]
    }
    document.title = tagInfo?.tagName
        ? `${tagInfo?.tagName} - KTX Cỏ May`
        : 'KTX Cỏ May'
    useEffect(() => {
        const tag = searchTagByUrl()
        setTagInfo(tag)
        setFilters({
            tag_id: tag.tagId,
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
                <NavLink
                    to={`/${convertToUrl(item.title)}/${item.postId}`}
                >
                    <img
                        src={item.thumbnail}
                        alt="Thumbnail error"
                        className={cx('CardImg')}
                    />
                </NavLink>
                <div className={cx('CardBody')}>
                    <NavLink
                        className={cx('CardTitle')}
                        to={`/${convertToUrl(item.title)}/${item.postId}`}
                    >
                        {item.title.slice(0, 82).trim()}...
                    </NavLink>
                    <div className={cx('CardInfo')}>
                        <Badge color="secondary" className={cx('CardTime')}>
                            <BsCalendar4 className="me-2" />
                            {moment(item.createdAt).locale('vi').format('llll')}
                        </Badge>
                    </div>
                    <div className={cx('Summary')}>{item.summary}...</div>
                </div>
            </div>
        ))
    }
    return (
        <>
            <Helmet>
                <title>{`${tagInfo?.tagName} - KTX Cỏ May`}</title>
                <meta name="description" content="KTX Cỏ May có diện tích rộng hơn 2.600 m2, thiết kế 4 tầng hiện đại, khang trang. Đó là tâm nguyện của một Doanh nhân người Nam Bộ đã viết nên nhiều câu chuyện, nhiều mảnh đời qua các thế hệ sinh viên trên cả nước, học tập và sinh sống tại TP.HCM." />
                <meta name="keywords" content="ktx cỏ may, ký túc xá, cỏ may, co may dormitory" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={`${tagInfo?.tagName} - KTX Cỏ May`} />
                <meta property="og:description" content="KTX Cỏ May có diện tích rộng hơn 2.600 m2, thiết kế 4 tầng hiện đại, khang trang. Đó là tâm nguyện của một Doanh nhân người Nam Bộ đã viết nên nhiều câu chuyện, nhiều mảnh đời qua các thế hệ sinh viên trên cả nước, học tập và sinh sống tại TP.HCM." />
                <meta property="og:image" content="%PUBLIC_URL%/image.jpeg" />
                <meta property="og:url" content="https://ktxcomay.com.vn/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${tagInfo?.tagName} - KTX Cỏ May`} />
                <meta name="twitter:description" content="KTX Cỏ May có diện tích rộng hơn 2.600 m2, thiết kế 4 tầng hiện đại, khang trang. Đó là tâm nguyện của một Doanh nhân người Nam Bộ đã viết nên nhiều câu chuyện, nhiều mảnh đời qua các thế hệ sinh viên trên cả nước, học tập và sinh sống tại TP.HCM." />
                <meta name="twitter:image" content="%PUBLIC_URL%/image.jpeg" />
                <meta name="author" content="Ký Túc Xá Cỏ May" />
                <meta name="apple-mobile-web-app-title" content={`${tagInfo?.tagName} - KTX Cỏ May`} />
                <meta name="application-name" content="Ký Túc Xá Cỏ May" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="theme-color" content="#ffffff" />
            </Helmet>
            <Wrapper>
                <div className={cx('Inner')}>
                    <div className={cx('Heading')}>
                        <h3 className={cx('Title')}>{tagInfo?.tagName}</h3>
                    </div>
                    {status === 'loading' ? (
                        <Spinner
                            tag="div"
                            className="text-center"
                            color="primary"
                            size="lg"
                        />
                    ) : listPost && listPost.length > 0 ? (
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
                        <div className="text-center">Trống</div>
                    )}
                </div>
            </Wrapper>
        </>
    )
}

export default Posts
