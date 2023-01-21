import React from 'react'

import styles from './Login.module.scss'
import { bindClassNames } from '~/utils'

export default function Login() {
    const cx = bindClassNames(styles)
    return <div className={cx('container')}></div>
}
