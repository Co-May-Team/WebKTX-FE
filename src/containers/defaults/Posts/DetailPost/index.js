import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function DetailPost(props) {
    const data = useSelector(postsSelector).posts[0]
    return (
        <div className={cx('container')}>
            <div className={cx('left')}>
                <div className={cx('main')}>
                    <div className={cx('title')}>{data.title}</div>
                    <div className={cx('createtime')}>{data.createDate}</div>
                    <div className={cx('content')}>{data.content}</div>
                </div>
                <div className={cx('more')}></div>
            </div>
            <div className={cx('right')}>
                <div className={cx('images')}></div>
                <div className={cx('news')}></div>
            </div>
        </div>
    )
}

DetailPost.propTypes = {}

export default DetailPost
