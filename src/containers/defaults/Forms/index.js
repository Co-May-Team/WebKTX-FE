import { AiOutlineFileWord } from 'react-icons/ai'
import { Pagination, PaginationItem } from 'reactstrap'
import { Button } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import { DefaultSection } from '../Home/sections'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function Forms() {
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
        <div className={cx('container')}>
            <DefaultSection title="BIỂU MẪU">
                <div className={cx('body')}>
                    <div className={cx('form-container')}>
                        {renderFormList()}
                    </div>
                    <div className={cx('pagination-container')}>
                        <Pagination className={cx('pagination-list')}>
                            <PaginationItem active>
                                <Button className={cx('pagination-link')}>
                                    1
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button className={cx('pagination-link')}>
                                    2
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button className={cx('pagination-link')}>
                                    3
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button className={cx('pagination-link')}>
                                    4
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button className={cx('pagination-link')}>
                                    5
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button className={cx('pagination-link')}>
                                    {'Next >'}
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button className={cx('pagination-link')}>
                                    {'Last >>'}
                                </Button>
                            </PaginationItem>
                        </Pagination>
                    </div>
                </div>
            </DefaultSection>
        </div>
    )
}
