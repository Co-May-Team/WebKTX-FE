import axios from 'axios'
import { useEffect, useState } from 'react'
import { Glide } from 'react-glide'
import 'react-glide/lib/reactGlide.css'
import { useNavigate } from 'react-router-dom'
import ImageWithTooltip from '~/components/Customs/ImageWithTooltip'
import convertToUrl from '~/utils/commons/convertToUrl'

export default function ImagesSection() {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-3">
                {posts.map((post) => (
                    <Glide width={288} height={320}>
                        {post.images.slice(0, 1).map((image) => (
                            <ImageWithTooltip
                                key={image?.id}
                                src={`https://drive.google.com/uc?export=view&id=${image.id}`}
                                alt={post?.title}
                                title={post?.title}
                            />
                        ))}
                    </Glide>
                ))}
            </div>
        )
    }
    return (
        <div className={'nc-SectionMagazine7 relative py-16 lg:py-28'}>
            <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 text-neutral-900 dark:text-neutral-50">
                <div className="text-center w-full max-w-2xl mx-auto ">
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Khám phá thư viện ảnh
                    </h2>
                    <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
                        Di chuột hoặc trượt qua lại đề xem ảnh khác trong cùng 1
                        chủ đề
                    </span>
                </div>
            </div>
            {renderImages()}
        </div>
    )
}
