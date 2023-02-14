import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Button } from 'reactstrap'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

/*
    Truyền vào 2 props:
    1. pagination: một đối tượng chứa 3 thuộc tính:
    + page: trang hiện tại
    + limit: số dòng trên mỗi trang
    + totalItem: tổng số Item của danh sách
    2. onPageChange: một hàm callback nhận vào một đối số là giá trị trang mới khi click chuột vào button
*/

const Pagination = ({ pagination, onPageChange }) => {
    // Lấy các đối tượng từ props pagination
    let { page, limit, totalItem } = pagination
    page = Number.parseInt(page)

    // Tính toán tổng số trang
    const totalPage = Math.ceil(totalItem / limit)

    // State lưu chiều rộng hiện tại của trình duyệt
    const [width, setWidth] = useState(window.innerWidth)

    // Hàm cập nhật state width mỗi khi trình duyệt thay đổi độ rộng
    const updateWidth = () => {
        setWidth(window.innerWidth)
    }

    // Effect có tác dụng thêm hàm cập nhật state width cho event resize
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [width])

    // Hàm này sẽ trả về một mảng lưu những số (hoặc dấu ...) cần hiển thị ra UI tùy thuộc vào chiều rộng của màn hình (đã responsive)
    const fetchListPage = () => {
        // Khởi tạo listPage là mảng rỗng
        const listPage = []

        // Thực hiện push những gì cần hiển thị vào listPage tùy thuộc vào giá trị cửa width
        if (width < 576) {
            if (totalPage >= 8) {
                if (page < 2) {
                    for (let i = 1; i <= 2; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                } else if (page > totalPage - 1) {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = totalPage - 1; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                } else {
                    listPage.push(page - 1)
                    listPage.push(page)
                    listPage.push(page + 1)
                }
            } else if (totalPage >= 5) {
                if (page <= 2) {
                    for (let i = 1; i <= 3; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                } else if (page > totalPage - 2) {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = totalPage - 2; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                } else {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = page - 1; i <= page + 1; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                }
            } else {
                for (let i = 1; i <= totalPage; ++i) {
                    listPage.push(i)
                }
            }
        } else if (width < 992) {
            if (totalPage >= 8) {
                if (page < 3) {
                    for (let i = 1; i <= 3; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                } else if (page > totalPage - 2) {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = totalPage - 2; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                } else {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = page - 1; i <= page + 1; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                }
            } else if (totalPage >= 5) {
                if (page <= 2) {
                    for (let i = 1; i <= 3; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                } else if (page > totalPage - 2) {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = totalPage - 2; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                } else {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = page - 1; i <= page + 1; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                }
            } else {
                for (let i = 1; i <= totalPage; ++i) {
                    listPage.push(i)
                }
            }
        } else {
            if (totalPage >= 8) {
                if (page < 4) {
                    for (let i = 1; i <= 4; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                } else if (page > totalPage - 3) {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = totalPage - 3; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                } else {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = page - 2; i <= page + 2; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                }
            } else if (totalPage >= 5) {
                if (page <= 2) {
                    for (let i = 1; i <= 3; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                } else if (page > totalPage - 2) {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = totalPage - 2; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                } else {
                    listPage.push(1)
                    listPage.push('...')
                    for (let i = page - 1; i <= page + 1; ++i) {
                        listPage.push(i)
                    }
                    listPage.push('...')
                    listPage.push(totalPage)
                }
            } else {
                for (let i = 1; i <= totalPage; ++i) {
                    listPage.push(i)
                }
            }
        }
        return listPage
    }

    return (
        <div
            className={cx('Container')}
            size={width < 576 ? 'sm' : width < 992 ? '' : 'lg'}
        >
            <Button
                outline
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
            >
                <FaAngleLeft />
            </Button>
            {fetchListPage().map((pageItem, index) => {
                if (pageItem === page) {
                    return (
                        <Button key={index} outline active>
                            {pageItem}
                        </Button>
                    )
                } else if (pageItem === '...') {
                    return (
                        <Button outline disabled key={index}>
                            {pageItem}
                        </Button>
                    )
                } else {
                    return (
                        <Button
                            key={index}
                            outline
                            onClick={() => onPageChange(pageItem)}
                        >
                            {pageItem}
                        </Button>
                    )
                }
            })}
            <Button
                outline
                disabled={page >= totalPage}
                onClick={() => onPageChange(page + 1)}
            >
                <FaAngleRight />
            </Button>
        </div>
    )
}

export default React.memo(Pagination)
