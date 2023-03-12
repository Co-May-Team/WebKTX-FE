import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import { Swiper, Wrapper } from '~/components/Customs'
import ImageWithTooltip from '~/components/Customs/ImageWithTooltip'
import { bindClassNames } from '~/utils'
import convertToUrl from '~/utils/commons/convertToUrl'
import styles from './ImageList.module.scss'

const cx = bindClassNames(styles)

const breakpoints = {
    768: {
        slidesPerView: 2,
    },
    1024: {
        slidesPerView: 4,
    },
}

export default function ImageList() {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            const response = await axios.get(
                "https://www.googleapis.com/drive/v3/files?q='19rP6BezjZtNZYNYYLuW904GjkGZeI72a'%20in%20parents&fields=files(id,name,mimeType,parents)&key=AIzaSyAS1KDnvd2dT6OeVnOwYCxtzlD4xGTsAi8"
            )

            const posts = response.data.files.filter(
                (file) => file.mimeType === 'application/vnd.google-apps.folder'
            )

            const postList = await Promise.all(
                posts.map(async (post) => {
                    const images = await axios.get(
                        `https://www.googleapis.com/drive/v3/files?q='${post.id}'%20in%20parents&fields=files(id,name,webContentLink)&key=AIzaSyAS1KDnvd2dT6OeVnOwYCxtzlD4xGTsAi8`
                    )
                    return {
                        id: post.id,
                        title: post.name,
                        images: images.data.files,
                    }
                })
            )
            setPosts(postList)
        }
        getPosts()
    }, [])

    const navigateToImagesDetailPage = (post) => {
        navigate(`/hinh-anh/${convertToUrl(post.title)}`, {
            state: post,
        })
    }

    const renderImages = () => {
        return (
            <Swiper spaceBetween={20} breakpoints={breakpoints}>
                {posts.map((post) =>
                    post.images.slice(0, 1).map((image) => (
                        <SwiperSlide key={image?.id}>
                            <div
                                className={cx('ImageItem')}
                                onClick={() => navigateToImagesDetailPage(post)}
                            >
                                <ImageWithTooltip
                                    src={`https://drive.google.com/uc?export=view&id=${image.id}`}
                                    alt={post?.title}
                                    title={post?.title}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        )
    }
    return (
        <Wrapper>
            <div className={cx('Inner')}>
                <div className={cx('Heading')}>
                    <h3 className={cx('Title')}>Hình ảnh Cỏ May</h3>
                </div>
                <div className={cx('ImageList')}>{renderImages()}</div>
            </div>
        </Wrapper>
    )
}
