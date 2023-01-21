import React from 'react'
import { Button } from '~/components/customs'
import { bindClassNames } from '~/utils'
import styles from './Posts.module.scss'

const cx = bindClassNames(styles)

function Posts() {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('title')}>Tất cả bài viết</div>
                <div className={cx('action')}>
                    <Button variant="active">Đăng bài mới</Button>
                </div>
            </div>
        </div>
    )
}

export default Posts
