import { AiFillEdit, AiOutlinePlaySquare, AiTwotoneHome } from 'react-icons/ai'
import { BiCircle, BiImage } from 'react-icons/bi'
import { GoBroadcast } from 'react-icons/go'

const listSidebarItem = [
    {
        id: 'home',
        label: 'Trang chủ',
        to: '/admin',
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
                to: '/admin/posts',
            },
            {
                id: 'post/created-by-me',
                label: 'Bài viết của tôi',
                icon: <BiCircle />,
                to: '/admin/posts/created-by-me',
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
                to: '/admin/media/images',
            },
            {
                id: 'media/videos',
                label: 'Video',
                icon: <AiOutlinePlaySquare />,
                to: '/admin/media/videos',
            },
        ],
    },
]
export default listSidebarItem
