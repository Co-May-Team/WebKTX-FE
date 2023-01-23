import PropTypes from 'prop-types'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Table from '~/components/Customs/Table'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function PostItem({ data }) {
    return (
        <tr>
            <td>{data.title}</td>
            <td>{data.creator.name}</td>
            <td>{data.createDate}</td>
            <td>
                <BsThreeDotsVertical className={cx('action')} />
            </td>
        </tr>
    )
}

PostItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default PostItem
