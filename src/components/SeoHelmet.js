import * as PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { env } from "~/utils/constants/env"

function SeoHelmet({
  title = "Tiếp bước sinh viên nghèo học giỏi",
  description = "KTX Cỏ May là một ký túc xá hiện đại và rộng rãi nằm trong khuôn viên của Trường Đại học Nông Lâm Thành phố Hồ Chí Minh, với tổng diện tích hơn 2.600 mét vuông, gồm bốn tầng và 54 phòng cho sinh viên. Ký túc xá nhằm mục đích cung cấp môi trường sống và học tập thuận lợi cho sinh viên nghèo có mong muốn theo đuổi giáo dục đại học và đóng góp cho sự phát triển của đất nước. Các phòng được trang bị bốn giường đôi, chăn ga miễn phí và két cá nhân, cũng như nhà tắm và các tiện nghi cơ bản khác. Ngoài ra, ký túc xá cũng cung cấp trợ cấp ăn uống hàng tuần, hỗ trợ toàn bộ học phí cho học kỳ đầu tiên và các loại hỗ trợ tài chính khác cho sinh viên có thành tích học tập tốt.",
  keywords = "KTX Cỏ May, ký túc xá, Trường Đại học Nông Lâm Thành phố Hồ Chí Minh, sinh viên nghèo, môi trường sống và học tập, giường đôi, chăn ga miễn phí, két cá nhân, trợ cấp ăn uống hàng tuần, hỗ trợ học phí, hỗ trợ tài chính.",
}) {
  return (
    <Helmet>
      <title>{title + " | KTX Cỏ May"}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={window.location.href} />
      <meta
        property='og:image'
        content={`${env.FRONTEND_URL + "/image.jpeg"}`}
      />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta
        property='twitter:image'
        content={`${env.FRONTEND_URL + "/image.jpeg"}`}
      />
      <meta name='author' content='Ký Túc Xá Cỏ May' />
      <meta
        name='apple-mobile-web-app-title'
        content={`${title} | KTX Cỏ May`}
      />
      <meta name='application-name' content='Ký Túc Xá Cỏ May' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='theme-color' content='#ffffff' />
    </Helmet>
  )
}

SeoHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
}

export default SeoHelmet
