import { path } from "~/utils"

const navList = [
  // {
  //   id: 1,
  //   name: "Bảng điều khiển"
  // },
  {
    id: 2,
    name: "Quản lý bài viết",
    to: `${path.ADMIN + path.POSTS}`,
  },
  {
    id: 2,
    name: "Quản lý đơn ứng tuyển",
    to: `${path.ADMIN + path.FORMS}`,
  },
]
export default navList
