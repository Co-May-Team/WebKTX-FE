import PropTypes from 'prop-types'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import Table from '~/components/customs/Table'
import { postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'
import PostItem from './PostItem'

const cx = bindClassNames(styles)

function ListPost() {
    const data = useSelector(postsSelector).posts
    return (
        <Table striped hover borderless>
            <thead>
                <tr>
                    <th>Tiêu đề</th>
                    <th>Người đăng</th>
                    <th>Ngày tạo</th>
                    <th>{/* Hành động */}</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <PostItem key={item.id} data={item} />
                ))}
            </tbody>
        </Table>
    )
}

ListPost.propTypes = {
    // data: PropTypes.array.isRequired
}

export default ListPost
