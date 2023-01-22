import PropTypes from 'prop-types'
import React from 'react'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function Table({ striped, hover, bordered, borderless, children }) {
    return (
        <table
            className={cx('table', {
                'table-striped': striped,
                'table-hover': hover,
                'table-bordered': bordered,
                'table-borderless': borderless,
            })}
        >
            {children}
        </table>
    )
}

Table.propTypes = {
    striped: PropTypes.bool,
    hover: PropTypes.bool,
    bordered: PropTypes.bool,
    borderless: PropTypes.bool,
}

export default Table
