import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LogoIcon } from '~/components/Icons'
import { tagsSelector } from '~/store/selectors'
import convertToUrl from '~/utils/commons/convertToUrl'

function Footer() {
  const tags = useSelector(tagsSelector).tags
  return (
    <div className="relative py-16 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <NavLink className="inline-block text-primary-6000" to="/ncmaz/">
              <LogoIcon />
            </NavLink>
          </div>
          <div className="col-span-2 flex items-center md:col-span-4">
            <div className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start">
              <a
                className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
                href="https://www.facebook.com/profile.php?id=100077916485181"
                target="_blank"
                rel="noopener noreferrer"
                title="Ký Túc Xá Cỏ May"
              >
                <i className="lab la-facebook-square" />
                <span className="hidden lg:block text-sm">Facebook</span>
              </a>
              <a
                className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
                href="https://www.youtube.com/channel/UCBfoSJb4tU3NPLTI6VWILFQ"
                target="_blank"
                rel="noopener noreferrer"
                title="Ký Túc Xá Cỏ May"
              >
                <i className="lab la-youtube" />
                <span className="hidden lg:block text-sm">Youtube</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-1 text-sm">
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
            Thẻ
          </h2>
          <ul className="mt-5 space-y-4">
            {tags?.map((tag) => (
              <li key={tag.tagId}>
                <NavLink
                  className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  to={`/${convertToUrl(tag.tagName)}`}
                >
                  {tag.tagName}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 text-sm">
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
            Khám phá
          </h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href="/#posts-section"
              >
                Bài viết
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href="/#images-section"
              >
                Hình ảnh
              </a>
            </li>
            <li>
              <a
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href="/#videos-section"
              >
                Video
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-2 text-sm">
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
            Thông tin
          </h2>
          <ul className="mt-5 space-y-4">
            <li>
              <div className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                Địa chỉ: KTX Cỏ May, Tổ 1, Khu phố 6, phường Linh trung, TP Thủ
                Đức, TP Hồ Chí Minh (trong khuôn viên trường Đại học Nông Lâm
                TPHCM)
              </div>
            </li>
            <li>
              <div className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                Số điện thoại: 0913887055
              </div>
            </li>
            <li>
              <div className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                Email: kytucxa@comaygroup.com
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
