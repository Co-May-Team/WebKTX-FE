import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import { imageUrl } from '~/assets/images'
import { Swiper, Wrapper } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import convertToUrl from '~/utils/commons/convertToUrl'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function ImagesSection() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const getPosts = async () => {
            const response = await axios.get(
                "https://www.googleapis.com/drive/v3/files?q='19rP6BezjZtNZYNYYLuW904GjkGZeI72a'%20in%20parents&fields=files(id,name,mimeType,parents)&key=AIzaSyAS1KDnvd2dT6OeVnOwYCxtzlD4xGTsAi8"
            );

            const posts = response.data.files.filter(
                (file) => file.mimeType === "application/vnd.google-apps.folder"
            );

            const postList = await Promise.all(
                posts.map(async (post) => {
                    const images = await axios.get(
                        `https://www.googleapis.com/drive/v3/files?q='${post.id}'%20in%20parents&fields=files(id,name,thumbnailLink)&key=AIzaSyAS1KDnvd2dT6OeVnOwYCxtzlD4xGTsAi8`
                    );
                    return { id: post.id, title: post.name, images: images.data.files };
                })
            );
            setPosts(postList);
        };
        getPosts();
    }, []);
    console.log(posts)
    const breakpoints = {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 4,
        },
    }
    const renderImages = () => {
        return (
            <Swiper spaceBetween={20} breakpoints={breakpoints}>
                {posts.map((post) => (
                    post.images.slice(0,1).map((image) => (
                        <SwiperSlide key={image?.id}>
                            <NavLink className={cx('image-item')} to={`/images?title=${post?.title}&id=${post?.id}`}>
                                <img src={image?.thumbnailLink} alt={post?.title} />
                            </NavLink>
                        </SwiperSlide>
                    ))
                )
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
                <div className={cx('image-list')}>{renderImages()}</div>
            </div>
        </Wrapper>
    )
}
