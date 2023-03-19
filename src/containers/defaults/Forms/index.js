/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { AiOutlineFileWord } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Wrapper } from '~/components/Customs'
import postsApi from '~/services/postsApi'
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
    setLoading(true)
    postsApi
      .getAll(params, { tag_id: searchTagByTagName().tagId })
      .then((response) => {
        setPostList(response.data.data.posts)
        setPagination(response.data.data.pagination)
        setLoading(false)
      })
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
      <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 text-neutral-900 dark:text-neutral-50 mt-5">
        <div className="text-center w-full max-w-2xl mx-auto ">
          <h2 className="text-3xl md:text-4xl font-semibold text-uppercase">
            BIỂU MẪU
          </h2>
        </div>
      </div>

      {loading ? (
        'Đang tải dữ liệu biểu mẫu...'
      ) : postList && postList.length > 0 ? (
        <>
          <div className={cx('FormContainer')}>{renderFormList()}</div>
        </>
      ) : (
        <div className="text-center">Trống</div>
      )}
    </Wrapper>
  )
}
