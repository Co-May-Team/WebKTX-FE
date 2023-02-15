import { useState } from 'react'
import { AiOutlineFileWord } from 'react-icons/ai'
import { Wrapper } from '~/components/Customs'
import Pagination from '~/components/Pagination'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function Forms() {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalItem: 150,
    })
    const renderFormList = () => {
        return [...Array(10).keys()].map((item) => (
            <div className={cx('form-item')} key={item}>
                <div className={cx('form-icon-wrapp')}>
                    <AiOutlineFileWord className={cx('form-icon')} />
                </div>
                <p className={cx('form-title')}>
                    XÉT CHỌN SINH VIÊN VÀO KTX CỎ MAY NĂM 2022 - 2023
                </p>
            </div>
        ))
    }

    return (
        <Wrapper>
            <div className={cx('Inner')}>
                <div className={cx('Heading')}>
                    <h3 className={cx('Title')}>Hình ảnh Cỏ May</h3>
                </div>
                <div className={cx('form-container')}>{renderFormList()}</div>
                <Pagination
                    pagination={pagination}
                    onPageChange={setPagination}
                />
            </div>
        </Wrapper>
    )
}
