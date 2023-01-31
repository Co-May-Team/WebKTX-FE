import PropTypes from 'prop-types'
import React from 'react'
import { Modal as ModalBootstrap } from 'reactstrap'
import { bindClassNames } from '~/utils'
import './index.scss'

function Modal({ children, isFullheight, ...props }) {
    return (
        <ModalBootstrap
            className={isFullheight && 'modal-fullheight'}
            {...props}
        >
            {children}
        </ModalBootstrap>
    )
}

Modal.propTypes = {}

export default Modal
