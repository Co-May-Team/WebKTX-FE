import moment from 'moment'
import 'moment/locale/vi' // Import Moment locale for Vietnamese
import { useEffect, useState } from 'react'
import {
    FaClock,
    FaCogs,
    FaListAlt,
    FaListOl,
    FaRegEye,
    FaShare,
    FaUser,
    FaUserClock,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    ListGroup,
    ListGroupItem,
} from 'reactstrap'
import postsApi from '~/apis/postsApi'
import { InputField, Wrapper } from '~/components/Customs'
import Confirm from '~/components/Customs/Confirm'
import SubmitPost from '~/containers/admin/Posts/SubmitPost'
import { deletePost } from '~/store/posts/actions'
import { authSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import randomColor from '~/utils/commons/randomColor'
import styles from './index.module.scss'
import MostViewPosts from './MostViewPosts'
import RecentPosts from './RecentPosts'
import ShareButtons from './ShareButtons'

const cx = bindClassNames(styles)

function PostDetail(props) {
    const userInfo = useSelector(authSelector).userInfo

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const [postInfo, setPostInfo] = useState(null)
    const [recentPosts, setRecentPosts] = useState([])
    const [mostViewPosts, setMostViewPosts] = useState([])
    const [visibleFormEditPost, setVisibleFormEditPost] = useState(false)
    const [visibleDeletePost, setVisibleDeletePost] = useState(false)

    useEffect(() => {
        postsApi
            .getAll(
                {
                    sort: 'viewed',
                    order: 'desc',
                    page: '1',
                },
                {}
            )
            .then((response) => {
                setMostViewPosts(response.data.data.posts)
            })
    }, [])
    useEffect(() => {
        postsApi.get(params.id).then((response) => {
            document.title = response.data.data.posts.title
            setPostInfo(response.data.data.posts)
            setRecentPosts(response.data.data.relatedPost)
        })
    }, [params.id])

    const handleDeletePost = () => {
        dispatch(deletePost(postInfo.postId))
        navigate(-1)
    }

    return (
        <Wrapper>
            <div className="d-sm-flex justify-content-between gap-3 d-block py-3">
                <div className="col-sm-8">
                    <Card>
                        <CardHeader>
                            <div className={cx('Title')}>
                                <Badge color={randomColor()} className="me-2">
                                    {postInfo?.category.categoryName}
                                </Badge>
                                {postInfo?.title}
                            </div>
                        </CardHeader>
                        <ListGroup>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>
                                        <FaUser /> Đăng: {postInfo?.userName}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <FaRegEye /> Lượt xem:{' '}
                                        {postInfo?.viewed}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <FaClock /> Thời gian:{' '}
                                        {moment(postInfo?.createdAt)
                                            .locale('vi')
                                            .format('LLLL')}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <FaUserClock /> Chỉnh sửa lần cuối:{' '}
                                        {moment(postInfo?.updatedAt)
                                            .locale('vi')
                                            .format('LLLL')}
                                    </ListGroupItem>
                                </ListGroup>
                                <hr />
                                <CardHeader>
                                    <CardTitle className="fw-bolder fs-2 text-center">
                                        {postInfo?.title}
                                    </CardTitle>
                                </CardHeader>
                                <hr />
                                <div
                                    className={cx('Content')}
                                    dangerouslySetInnerHTML={{
                                        __html: postInfo?.content,
                                    }}
                                />
                            </CardBody>
                        </ListGroup>
                    </Card>
                </div>
                <div className="col-sm-4">
                    <Card className="mt-sm-0 mt-3">
                        <CardHeader>
                            <CardTitle>
                                {' '}
                                <FaShare /> Chia sẻ bài viết
                            </CardTitle>
                        </CardHeader>
                        <ListGroup>
                            <CardBody>
                                <div className={cx('Share')}>
                                    <ShareButtons url={window.location.href} />
                                </div>
                                <hr />
                                <InputField
                                    readOnly
                                    label="Link"
                                    type="textarea"
                                    value={`${window.location.href}`}
                                    rows={3}
                                />
                                <hr />
                                <InputField
                                    readOnly
                                    label="BBCode"
                                    type="textarea"
                                    value={`[url=${window.location.href}]${postInfo?.title}[/url]`}
                                    rows={5}
                                />
                                <hr />
                                <InputField
                                    readOnly
                                    label="HTML"
                                    type="textarea"
                                    value={`<a href="${window.location.href}" title="${postInfo?.title}" target="_blank">${postInfo?.title}</a>`}
                                    rows={7}
                                />
                            </CardBody>
                        </ListGroup>
                    </Card>
                    {userInfo?.id && (
                        <Card className="mt-3">
                            <CardHeader>
                                <CardTitle>
                                    <FaCogs /> Quản lý bài viết
                                </CardTitle>
                            </CardHeader>
                            <ListGroup>
                                <ListGroupItem>
                                    <Button
                                        className="mx-2"
                                        color="none"
                                        onClick={() => {
                                            setVisibleFormEditPost(true)
                                        }}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                    |
                                    <Button
                                        className="mx-2"
                                        color="none"
                                        onClick={() => {
                                            setVisibleDeletePost(true)
                                        }}
                                    >
                                        Xóa
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    )}
                    <Card className="mt-3">
                        <CardHeader>
                            <CardTitle>
                                <FaListAlt /> Bài viết gần đây
                            </CardTitle>
                        </CardHeader>
                        <ListGroup>
                            <RecentPosts listPost={recentPosts} />
                        </ListGroup>
                    </Card>
                    <Card className="mt-3">
                        <CardHeader>
                            <CardTitle>
                                <FaListOl /> Xem nhiều nhất
                            </CardTitle>
                        </CardHeader>
                        <ListGroup>
                            <MostViewPosts listPost={mostViewPosts} />
                        </ListGroup>
                    </Card>
                    <div className={cx('News')}></div>
                </div>
            </div>
            {visibleFormEditPost && (
                <SubmitPost
                    visible={visibleFormEditPost}
                    setVisible={() =>
                        setVisibleFormEditPost(!visibleFormEditPost)
                    }
                    post={postInfo}
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
        </Wrapper>
    )
}

PostDetail.propTypes = {}

export default PostDetail
