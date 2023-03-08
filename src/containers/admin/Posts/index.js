/* eslint-disable react-hooks/exhaustive-deps */
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'
import Pagination from '~/components/Pagination'
import { fetchPosts } from '~/store/posts/actions'
import { postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'
import ListPost from './ListPost'
import SubmitPost from './SubmitPost'

const cx = bindClassNames(styles)

function Posts() {
    const listPost = useSelector(postsSelector).posts
    const pagination = useSelector(postsSelector).pagination

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [visibleSubmitPost, setVisibleSubmitPost] = useState(false)
    const [filters, setFilters] = useState({
        page: 1,
    })

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage,
        })
    }

    useEffect(() => {
        document.title = 'Quản lý bài viết - Control Panel'
        const params = queryString.parse(location.search)
        if (
            Object.keys(params).length > 1 ||
            (Object.keys(params).length > 0 && params.page !== '1')
        ) {
            setFilters(params)
        }
    }, [])
    useEffect(() => {
        const requestUrl =
            location.pathname + '?' + queryString.stringify(filters)
        dispatch(fetchPosts(filters))
        navigation(requestUrl)
    }, [filters])

    return (
        <div className={cx('Container')}>
            <div className={cx('Header')}>
                <div className={cx('Title')}>Tất cả bài viết</div>
                <div className={cx('Action')}>
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
            <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default Posts
