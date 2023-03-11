import { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import axiosClient from '~/apis/axiosClient'
import { Swiper, Wrapper } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function VideosSection() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await axiosClient.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                    params: {
                        part: 'snippet',
                        channelId: 'UC2qKiLt6CGASAsL7ZmAou4g', // Thay CHANNEL_ID bằng ID của kênh YouTube bạn muốn lấy danh sách video
                        maxResults: 50, // Số lượng video bạn muốn lấy
                        key: 'AIzaSyAS1KDnvd2dT6OeVnOwYCxtzlD4xGTsAi8', // Thay YOUR_API_KEY bằng API key bạn đã tạo
                    },
                }
            );

            setVideos(response.data.items);
        };

        fetchVideos();
    }, [])
    const breakpoints = {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
    const renderVideosCard = () => {
        return (
            <Swiper spaceBetween={20} breakpoints={breakpoints}>
                {videos.map((video) => (
                    <SwiperSlide key={video.id.videoId}>
                        <div className={cx('video-item')}>
                            <iframe
                                className={cx('video-frame')}
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                title={video.snippet.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <p className={cx('video-title')}>{video.snippet.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        )
    }
    return (
        <Wrapper>
            <div className={cx('Inner')}>
                <div className={cx('Heading')}>
                    <h3 className={cx('Title')}>Video Cỏ May</h3>
                </div>
                <div className={cx('body')}>{renderVideosCard()}</div>
            </div>
        </Wrapper>
    )
}
