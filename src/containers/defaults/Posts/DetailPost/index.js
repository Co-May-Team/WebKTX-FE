import moment from 'moment'
import 'moment/locale/vi' // Import Moment locale for Vietnamese
import { useEffect, useRef, useState } from 'react'
import { FaClock, FaListAlt, FaShare, FaUser } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    ListGroup,
    ListGroupItem,
} from 'reactstrap'
import postsApi from '~/apis/postsApi'
import { InputField, Wrapper } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import randomColor from '~/utils/commons/randomColor'
import styles from './index.module.scss'
import MorePost from './MorePost'
import ShareButtons from './ShareButtons'

const cx = bindClassNames(styles)

function DetailPost(props) {
    const params = useParams()

    const [postInfo, setPostInfo] = useState(null)
    const [relatedPost, setRelatedPost] = useState([])
    const bbCodeRef = useRef(null)

    const handleBBCodeCopy = () => {
        if (bbCodeRef.current) {
            bbCodeRef.current.select()
            document.execCommand('copy')
        }
    }

    useEffect(() => {
        postsApi.get(params.id).then((response) => {
            document.title = response.data.data.posts.title
            setPostInfo(response.data.data.posts)
            setRelatedPost(response.data.data.relatedPost)
        })
    }, [params.id])

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
                                <div className="row mb-3">
                                    <div className="col-xs-12">
                                        <FaUser /> Đăng: {postInfo?.userName}
                                        <br />
                                        <FaClock /> Thời gian:{' '}
                                        {moment(postInfo?.createdAt)
                                            .locale('vi')
                                            .format('LLLL')}
                                        <br />
                                        <FaClock /> Chỉnh sửa lần cuối:{' '}
                                        {moment(postInfo?.updatedAt)
                                            .locale('vi')
                                            .format('LLLL')}
                                    </div>
                                </div>
                                <ListGroupItem></ListGroupItem>
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
                    <Card className="mt-3">
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
                                    label="BBCode"
                                    type="textarea"
                                    value={`[url=${window.location.href}]${postInfo?.title}[/url]`}
                                    inputRef={bbCodeRef}
                                    onClick={handleBBCodeCopy}
                                />
                                <hr />
                                <InputField
                                    label="HTML"
                                    type="textarea"
                                    rows={3}
                                    value={`<a href="${window.location.href}" title="${postInfo?.title}" target="_blank">${postInfo?.title}</a>
`}
                                    inputRef={bbCodeRef}
                                    onClick={handleBBCodeCopy}
                                />
                            </CardBody>
                        </ListGroup>
                    </Card>
                </div>
                <div className="col-sm-4">
                    <Card className="mt-xs-3 mt-0">
                        <CardHeader>
                            <CardTitle>
                                <FaListAlt /> Bài viết khác
                            </CardTitle>
                        </CardHeader>
                        <ListGroup>
                            <MorePost listPost={relatedPost} />
                        </ListGroup>
                    </Card>
                    <div className={cx('News')}></div>
                </div>
            </div>
        </Wrapper>
    )
}

DetailPost.propTypes = {}

export default DetailPost
