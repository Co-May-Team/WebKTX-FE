import PropTypes from "prop-types"
import { useRef } from "react"
import { useClickOutside } from "~/hooks"
import { bindClassNames } from "~/utils"
import styles from "./index.module.scss"

const cx = bindClassNames(styles)

function Dropdown({
  visible,
  setVisible,
  toggleButton,
  children,
  animationClassNames,
}) {
  const dropdownRef = useRef()
  useClickOutside(dropdownRef, () => setVisible(false))
  return (
    <div ref={dropdownRef} className={cx("container")}>
      <div className={cx("toggle")} onClick={() => setVisible(!visible)}>
        {toggleButton}
      </div>
      <div
        className={cx("menu", { visible }) + " " + animationClassNames}
        onClick={() => setVisible(false)}
      >
        {children}
      </div>
    </div>
  )
}

Dropdown.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  toggleButton: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  animationClassNames: PropTypes.string.isRequired,
}

export default Dropdown
