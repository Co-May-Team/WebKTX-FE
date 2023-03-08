/* eslint-disable react-hooks/exhaustive-deps */
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { AiOutlineFileWord } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Wrapper } from '~/components/Customs'
import Pagination from '~/components/Pagination'
import { fetchPosts } from '~/store/posts/actions'
import { postsSelector, tagsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function Forms() {
    const tagList = useSelector(tagsSelector).tags
    const status = useSelector(postsSelector).status
    const listPost = useSelector(postsSelector).posts
    const pagination = useSelector(postsSelector).pagination

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

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
        dispatch(
            fetchPosts({ params, filters: { tag_id: searchTagByTagName() } })
        )
        navigation(requestUrl)
    }, [params])

    const renderFormList = () => {
        return listPost.map((item) => {
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
                <div className={cx('FormContainer')}>{renderFormList()}</div>
                <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            </div>
        </Wrapper>
    )
}
