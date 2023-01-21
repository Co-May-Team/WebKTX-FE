import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './Button.module.scss'
import { forwardRef } from 'react'

const cx = classNames.bind(styles)

const Button = forwardRef(({ children, className, variant, onClick }, ref) => {
    return (
        <button
            ref={ref}
            className={cx('button', {
                [className]: className,
                [variant]: variant,
            })}
            onClick={onClick}>
            {children}
        </button>
    )
})

export default Button

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func,
}
