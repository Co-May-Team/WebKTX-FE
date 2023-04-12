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
]
export default navList
