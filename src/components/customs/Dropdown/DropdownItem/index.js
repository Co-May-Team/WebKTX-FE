import PropTypes from 'prop-types'
import React from 'react'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function DropdownItem({ children, ...props }) {
    return (
        <div className={cx('container')} {...props}>
            {children}
        </div>
    )
}

DropdownItem.propTypes = {}

export default DropdownItem
