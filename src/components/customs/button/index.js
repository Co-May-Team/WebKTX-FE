import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import { forwardRef } from 'react'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

const Button = forwardRef(({ children, className, variant, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cx('button', {
                [className]: className,
                [variant]: variant,
            })}
            {...props}
        >
            {children}
        </button>
    )
})

export default Button

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    variant: PropTypes.string,
}
