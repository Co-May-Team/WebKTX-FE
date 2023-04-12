import { LazyLoadImage } from "react-lazy-load-image-component"
import { bindClassNames } from "~/utils"
import styles from "./index.module.scss"

const cx = bindClassNames(styles)

const ImageWithTooltip = ({ src, alt, title, ...props }) => {
  return (
    <div className={cx("ImageContainer")}>
      <LazyLoadImage
        className={cx("Image")}
        effect='blur'
        src={src}
        alt={alt}
        title={title}
        {...props}
      />
      <div className={cx("Tooltip")}>{title}</div>
    </div>
  )
}

export default ImageWithTooltip
