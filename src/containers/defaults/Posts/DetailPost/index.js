import 'moment/locale/vi' // Import Moment locale for Vietnamese
import { useEffect, useState } from 'react'
import { FaClock, FaShare, FaUser } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { Card, CardBody, CardHeader, CardTitle, ListGroup } from 'reactstrap'
import postsApi from '~/apis/postsApi'
import { Wrapper } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'
import ShareButtons from './ShareButtons'

const cx = bindClassNames(styles)

function DetailPost(props) {
    const params = useParams()

    const [postInfo, setPostInfo] = useState(null)

    const formatDate = (originalDate) => {
        const date = new Date(originalDate)
        return `${date.getHours()}:${date.getMinutes()}, ${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`
    }

    useEffect(() => {
        postsApi.get(params.id).then((response) => {
            setPostInfo(response.data.data)
        })
    }, [])

    return (
        <Wrapper>
            <div className={cx('Container')}>
                <div className="col-sm-9">
                    <Card>
                        <CardHeader>
                            <CardTitle className="fw-bolder fs-1">
                                {postInfo?.title}
                            </CardTitle>
                        </CardHeader>
                        <ListGroup>
                            <CardBody>
                                <div className="row mb-3">
                                    <div className="col-xs-12">
                                        <FaUser /> Đăng: {postInfo?.userName}
                                        <br />
                                        <FaClock /> Đăng vào lúc:{' '}
                                        {postInfo?.createdAt}
                                        <br />
                                        <FaClock /> Chỉnh sửa lần cuối vào lúc:{' '}
                                        {postInfo?.updatedAt}
                                    </div>
                                </div>
                                <hr />
                                <div
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
                            </CardBody>
                        </ListGroup>
                    </Card>
                </div>
                <div className="col-sm-3">
                    <div className={cx('Images')}></div>
                    <div className={cx('News')}></div>
                </div>
            </div>
        </Wrapper>
    )
}

DetailPost.propTypes = {}

export default DetailPost
