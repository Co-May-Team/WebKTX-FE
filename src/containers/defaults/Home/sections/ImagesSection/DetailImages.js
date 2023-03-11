import axios from 'axios'
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
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
import MostViewPosts from '~/containers/defaults/Posts/DetailPost/MostViewPosts'
import RecentPosts from '~/containers/defaults/Posts/DetailPost/RecentPosts'
import ShareButtons from '~/containers/defaults/Posts/DetailPost/ShareButtons'
import { deletePost } from '~/store/posts/actions'
import { authSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import randomColor from '~/utils/commons/randomColor'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function DetailImages(props) {
    const userInfo = useSelector(authSelector).userInfo

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const id = searchParams.get("id")
    const title = searchParams.get("title")

    const [postInfo, setPostInfo] = useState(null)
    const [recentPosts, setRecentPosts] = useState([])
    const [mostViewPosts, setMostViewPosts] = useState([])

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
        const getImagesInfo = async () => {
            const images = await axios.get(
                `https://www.googleapis.com/drive/v3/files?q='${id}'%20in%20parents&fields=files(id,name,webContentLink)&key=AIzaSyAS1KDnvd2dT6OeVnOwYCxtzlD4xGTsAi8`
            );
            setPostInfo({ id, title, images: images.data.files })
        }
        getImagesInfo()
    }, [id])

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
                                    Hình ảnh
                                </Badge>
                                {postInfo?.title}
                            </div>
                        </CardHeader>
                        <ListGroup>
                            <CardBody>
                                <ListGroup>
                                </ListGroup>
                                <hr />
                                <CardHeader>
                                    <CardTitle className="fw-bolder fs-2 text-center">
                                        {postInfo?.title}
                                    </CardTitle>
                                </CardHeader>
                                <hr />
                                <div className={cx('Content')}>
                                <div>
                                    {postInfo?.images.map((image) => (
                                        <img key={id} alt={title} src={image.webContentLink } />
                                    ))}
                                </div>
                                </div>
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
        </Wrapper>
    )
}

DetailImages.propTypes = {}

export default DetailImages
