/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '~/components/Customs'
import { fetchPosts } from '~/store/posts/actions'
import { postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'
import ListPost from './ListPost'
import SubmitPost from './SubmitPost'

const cx = bindClassNames(styles)

function Posts() {
    const listPost = useSelector(postsSelector).posts
    const dispatch = useDispatch()

    const [visibleSubmitPost, setVisibleSubmitPost] = useState(false)

    useEffect(() => {
        dispatch(fetchPosts({ content: '' }))
    }, [])
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('title')}>Tất cả bài viết</div>
                <div className={cx('action')}>
                    <Button
                        color="primary"
                        className="fw-bold"
                        onClick={setVisibleSubmitPost}
                    >
                        Đăng bài mới
                    </Button>
                </div>
            </div>
            <ListPost data={listPost} categoryName="" />
            {visibleSubmitPost && (
                <SubmitPost
                    visible={visibleSubmitPost}
                    setVisible={() => setVisibleSubmitPost(!visibleSubmitPost)}
                />
            )}
        </div>
    )
}

export default Posts
