import 'moment/locale/vi' // Import Moment locale for Vietnamese
import { useEffect, useState } from 'react'
import { FaListAlt, FaListOl, FaShare } from 'react-icons/fa'
import { trackWindowScroll } from 'react-lazy-load-image-component'
import { useLocation } from 'react-router-dom'
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ListGroup,
} from 'reactstrap'
import { InputField, Wrapper } from '~/components/Customs'
import ImageWithTooltip from '~/components/Customs/ImageWithTooltip'
import MostViewPosts from '~/containers/defaults/Posts/PostDetail/MostViewPosts'
import RecentPosts from '~/containers/defaults/Posts/PostDetail/RelatedPosts'
import ShareButtons from '~/containers/defaults/Posts/PostDetail/ShareButtons'
import postsApi from '~/services/postsApi'
import { bindClassNames } from '~/utils'
import randomColor from '~/utils/commons/randomColor'
import styles from './ImagesDetail.module.scss'

const cx = bindClassNames(styles)

function ImagesDetail(props) {
  const location = useLocation()

  const [postInfo] = useState(location.state)
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
                <ListGroup></ListGroup>
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
                      <ImageWithTooltip
                        key={postInfo?.id}
                        alt={postInfo?.title}
                        title={postInfo?.title}
                        src={image.webContentLink}
                      />
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

ImagesDetail.propTypes = {}

export default trackWindowScroll(ImagesDetail)
