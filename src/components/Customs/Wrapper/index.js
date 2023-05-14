import PropTypes from "prop-types"
import { bindClassNames } from "~/utils"
import styles from "./index.module.scss"

const cx = bindClassNames(styles)

export default function Wrapper({ children, className }) {
  return (
    <div className={cx("default", { [className]: className })}>{children}</div>
  )
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
