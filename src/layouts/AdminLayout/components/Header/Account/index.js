import React from 'react'
import PropTypes from 'prop-types'
import { bindClassNames, handleClassName } from '~/utils'
import styles from './index.module.scss'
import defaultAvatar from '~/assets/images/dormitory.jpg'

const cx = bindClassNames(styles)

function Account(props) {
    return (
        <div className={cx('container')}>
            <div className={cx('info')}>
                <div className={cx('name')}>Admin</div>
                <div className={cx('position')}>Ký túc xã Cỏ May</div>
            </div>
            <img className={cx('avatar')} src={defaultAvatar} />
        </div>
    )
}

Account.propTypes = {}

export default Account
