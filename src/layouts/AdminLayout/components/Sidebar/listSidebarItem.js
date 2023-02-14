import { AiFillEdit, AiOutlinePlaySquare, AiTwotoneHome } from 'react-icons/ai'
import { BiImage } from 'react-icons/bi'
import { GoBroadcast } from 'react-icons/go'

const listSidebarItem = [
    {
        name: 'Bảng điều khiển',
        to: '/admin',
        icon: AiTwotoneHome,
    },
    {
        name: 'Quản lý bài viết',
        icon: AiFillEdit,
        to: '/admin/posts',
    },
    {
        name: 'Thư viện',
        icon: GoBroadcast,
        children: [
            {
                name: 'Quản lý hình ảnh',
                icon: BiImage,
                to: '/admin/media/images',
            },
            {
                name: 'Quản lý ideo',
                icon: AiOutlinePlaySquare,
                to: '/admin/media/videos',
            },
        ],
    },
]
export default listSidebarItem
