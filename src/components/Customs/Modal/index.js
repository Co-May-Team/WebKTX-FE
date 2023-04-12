import { Modal as ModalBootstrap } from "reactstrap"
import "./index.scss"

function Modal({ children, isFullheight, ...props }) {
  return (
    <ModalBootstrap className={isFullheight && "modal-fullheight"} {...props}>
      {children}
    </ModalBootstrap>
  )
}

Modal.propTypes = {}

export default Modal
