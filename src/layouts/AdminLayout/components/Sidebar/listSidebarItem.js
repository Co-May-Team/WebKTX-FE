import { AiFillEdit, AiOutlinePlaySquare, AiTwotoneHome } from 'react-icons/ai'
import { BiImage } from 'react-icons/bi'
import { GoBroadcast } from 'react-icons/go'

const listSidebarItem = [
    {
        id: Math.random(),
        label: 'Trang chủ',
        to: '/admin',
        icon: <AiTwotoneHome />,
    },
    {
        id: Math.random(),
        label: 'Bài đăng',
        icon: <AiFillEdit />,
        to: '/admin/posts',
    },
    {
        id: Math.random(),
        label: 'Thư viện',
        icon: <GoBroadcast />,
        children: [
            {
                id: Math.random(),
                label: 'Hình ảnh',
                icon: <BiImage />,
                to: '/admin/media/images',
            },
            {
                id: Math.random(),
                label: 'Video',
                icon: <AiOutlinePlaySquare />,
                to: '/admin/media/videos',
            },
        ],
    },
]
export default listSidebarItem
