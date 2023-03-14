import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

/*
    Truyền vào 2 props:
    1. pagination: một đối tượng chứa 3 thuộc tính:
    + page: trang hiện tại
    + limit: số dòng trên mỗi trang
    + totalItem: tổng số Item của danh sách
    2. onPageChange: một hàm callback nhận vào một đối số là giá trị trang mới khi click chuột vào button
*/

const Pagination = ({ pagination, onPageChange }) => {
    const page = Number.parseInt(pagination?.page)

    // Tính toán tổng số trang
    const totalPage = Math.ceil(pagination?.totalItem / pagination?.limit)

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
        <div className="nc-Pagination space-x-1 text-base font-medium mt-3 flex justify-content-center">
            <button
                className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
            >
                <FaAngleLeft />
            </button>
            {fetchListPage().map((pageItem, index) => {
                if (pageItem === page) {
                    return (
                        <span
                            className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white focus:outline-none"
                            key={index}
                        >
                            {pageItem}
                        </span>
                    )
                } else if (pageItem === '...') {
                    return (
                        <button
                            className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                            disabled
                            key={index}
                        >
                            {pageItem}
                        </button>
                    )
                } else {
                    return (
                        <button
                            className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                            key={index}
                            onClick={() => onPageChange(pageItem)}
                        >
                            {pageItem}
                        </button>
                    )
                }
            })}
            <button
                className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                disabled={page >= totalPage}
                onClick={() => onPageChange(page + 1)}
            >
                <FaAngleRight />
            </button>
        </div>
    )
}

export default React.memo(Pagination)
