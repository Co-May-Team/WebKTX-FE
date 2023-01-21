import { AiFillEdit, AiOutlinePlaySquare, AiTwotoneHome } from 'react-icons/ai'
import { BiCircle, BiImage } from 'react-icons/bi'
import { GoBroadcast } from 'react-icons/go'

const listSidebarItem = [
    {
        id: 'home',
        label: 'Trang chủ',
        to: '/system',
        icon: <AiTwotoneHome />,
    },
    {
        id: 'post',
        label: 'Bài đăng',
        icon: <AiFillEdit />,
        children: [
            {
                id: 'post-all',
                label: 'Tất cả bài viết',
                icon: <BiCircle />,
                to: '/system/posts',
            },
            {
                id: 'post/created-by-me',
                label: 'Bài viết của tôi',
                icon: <BiCircle />,
                to: '/system/posts/created-by-me',
            },
        ],
    },
    {
        id: 'media',
        label: 'Thư viện',
        icon: <GoBroadcast />,
        children: [
            {
                id: 'media/images',
                label: 'Hình ảnh',
                icon: <BiImage />,
                to: '/system/media/images',
            },
            {
                id: 'media/videos',
                label: 'Video',
                icon: <AiOutlinePlaySquare />,
                to: '/system/media/videos',
            },
        ],
    },
]
export default listSidebarItem
