/* eslint-disable react-hooks/exhaustive-deps */
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { AiOutlineFileWord } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Spinner } from 'reactstrap'
import postsApi from '~/apis/postsApi'
import { Wrapper } from '~/components/Customs'
import Pagination from '~/components/Pagination'
import { tagsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function Forms() {
    const tagList = useSelector(tagsSelector).tags

    const location = useLocation()
    const navigation = useNavigate()

    const [loading, setLoading] = useState(false)
    const [postList, setPostList] = useState([])
    const [pagination, setPagination] = useState(null)

    const [params, setParams] = useState({
        page: 1,
    })

    const handlePageChange = (newPage) => {
        setParams({
            ...params,
            page: newPage,
        })
    }
    const searchTagByTagName = () => {
        return tagList.filter((tag) => tag?.tagName === 'Biểu mẫu')[0]
    }
    const extractLinkAndTitle = (content) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(content, 'text/html')

        const link = doc.querySelector('a')?.getAttribute('href')
        const title = doc.querySelector('a')?.textContent

        return { title, link }
    }
    useEffect(() => {
        document.title = 'Biểu mẫu - KTX Cỏ May'
        const params = queryString.parse(location.search)
        if (
            Object.keys(params).length > 1 ||
            (Object.keys(params).length > 0 && params.page !== '1')
        ) {
            setParams(params)
        }
    }, [])
    useEffect(() => {
        const requestUrl =
            location.pathname + '?' + queryString.stringify(params)
        setLoading(true)
        postsApi
            .getAll(params, { tag_id: searchTagByTagName().tagId })
            .then((response) => {
                setPostList(response.data.data.posts)
                setPagination(response.data.data.pagination)
                setLoading(false)
            })
        navigation(requestUrl)
    }, [params])

    const renderFormList = () => {
        return postList.map((item) => {
            const result = extractLinkAndTitle(item?.content)
            return (
                <a href={result.link} className={cx('FormItem')} key={item}>
                    <div className={cx('FormIconWrapper')}>
                        <AiOutlineFileWord className={cx('FormIcon')} />
                    </div>
                    <p className={cx('FormTitle')}>{item.title}</p>
                </a>
            )
        })
    }

    return (
        <Wrapper>
            <div className={cx('Inner')}>
                <div className={cx('Heading')}>
                    <h3 className={cx('Title')}>Biểu mẫu</h3>
                </div>

                {loading ? (
                    <Spinner
                        tag="div"
                        className="text-center"
                        color="primary"
                        size="lg"
                    />
                ) : postList && postList.length > 0 ? (
                    <>
                        <div className={cx('FormContainer')}>
                            {renderFormList()}
                        </div>
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="text-center">Trống</div>
                )}
            </div>
        </Wrapper>
    )
}
