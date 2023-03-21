/* eslint-disable jsx-a11y/alt-text */
import { Formik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { InputField } from '~/components/Customs'
import Modal from '~/components/Customs/Modal'
import MultiSelect from '~/components/Customs/MultiSelect'
import postsApi from '~/services/postsApi'
import { fetchCategories } from '~/store/categories/actions'
import { addPostToList, updatePostList } from '~/store/posts/actions'
import { categoriesSelector, tagsSelector } from '~/store/selectors'
import { fetchTags } from '~/store/tags/actions'
import { defaultThumbnail } from '~/utils/constants/default'
import './index.scss'
import QuillEditor from './QuillEditor'

function SubmitPost({ visible, setVisible, post }) {
  const tags = useSelector(tagsSelector).tags
  const categories = useSelector(categoriesSelector).categories

  const dispatch = useDispatch()

  const [thumbnail, setThumbnail] = useState(defaultThumbnail)

  useEffect(() => {
    dispatch(fetchTags())
    dispatch(fetchCategories())
    if (post?.postId) {
      setThumbnail(post.thumbnail)
    }
  }, [])

  const handleUploadThumbnail = (event, setFieldValue) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    const reader = new FileReader()
    reader.onload = () => {
      setThumbnail(reader.result)
    }
    setFieldValue('thumbnail', formData)
    reader.readAsDataURL(file)
  }

  const addedDate = (originalDate) => {
    return moment(originalDate).add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss')
  }
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    hours = hours < 10 ? `0${hours}` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    day = day < 10 ? `0${day}` : day
    month = month < 10 ? `0${month}` : month

    const dayOfWeek = [
      'chủ nhật',
      'thứ hai',
      'thứ ba',
      'thứ tư',
      'thứ năm',
      'thứ sáu',
      'thứ bảy',
    ][date.getDay()]

    return `Bài viết sẽ được đăng vào lúc ${hours}:${minutes}:${seconds}, ${dayOfWeek} ${day}/${month}/${year}`
  }

  let initialValues = {
    title: '',
    content: '',
    summary: '',
    isPublished: true,
    publishedAt: addedDate(new Date()),
    category: {},
    tagIds: [],
    thumbnail: '',
  }
  if (post?.postId) {
    initialValues = {
      ...initialValues,
      ...post,
    }
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Vui lòng nhập tiêu đề bài viết.')
      .max(256, 'Tiêu đề bài viết phải ít hơn 256 ký tự.'),
    content: Yup.string().required('Vui lòng nhập nội dung bài viết.'),
    summary: Yup.string(),
    publishedAt: Yup.string().required(),
    category: Yup.object()
      .shape({
        categoryId: Yup.string(),
        categoryName: Yup.string(),
      })
      .required('Vui lòng chọn chuyên mục của bài viết.'),
    tagModels: Yup.array()
      .min(1, 'Bạn phải chọn ít nhất 1 thẻ.')
      .of(
        Yup.object().shape({
          tagId: Yup.string().required(),
          tagName: Yup.string().required(),
        })
      ),
  })
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
    let nameThumbnail = ''
    if (values.thumbnail !== '') {
      nameThumbnail = await postsApi
        .uploadImages(values.thumbnail)
        .then((response) => {
          return response.data.data.name
        })
    }
    const data = {
      ...values,
      thumbnail: nameThumbnail,
      tagIds: values.tagModels.map((tag) => tag.tagId),
      category: values.category.categoryId,
    }
    if (post?.postId) {
      postsApi.updatePost(data).then((response) => {
        if (response.data.status === 'OK') {
          Toast.fire({
            title: 'Chỉnh sửa bài viết',
            text: response.data.message,
            icon: 'success',
          })
          dispatch(updatePostList(response.data.data))
          setVisible()
        } else {
          Toast.fire({
            title: 'Chỉnh sửa bài viết',
            text: response.data.message,
            icon: 'warning',
          })
        }
      })
    } else {
      postsApi.addPost(data).then((response) => {
        if (response.data.status === 'OK') {
          Toast.fire({
            title: 'Thêm bài viết',
            text: response.data.message,
            icon: 'success',
          })
          dispatch(addPostToList(response.data.data))
          setVisible()
        } else {
          Toast.fire({
            title: 'Thêm bài viết',
            text: response.data.message,
            icon: 'warning',
          })
        }
      })
    }
    actions.setSubmitting(false)
  }

  return (
    <Modal
      isFullheight
      size="lg"
      scrollable
      backdrop="static"
      isOpen={visible}
      toggle={setVisible}
    >
      <ModalHeader className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <div className="text-2xl">
          {post?.postId ? 'Chỉnh sửa bài viết' : 'Đăng bài viết'}
        </div>
        <span
          className="absolute right-2 top-2 p-1"
          onClick={() => setVisible(false)}
        >
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none">
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </ModalHeader>
      <ModalBody className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            setFieldError,
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <InputField
                  type="text"
                  name="title"
                  placeholder="Nhập tiêu đề bài viết..."
                  label="Tiêu đề"
                  inputClassName={touched.title && errors.title && 'is-invalid'}
                  autoComplete="off"
                  value={values.title}
                  feedback={errors.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.title && errors.title}
                  isRequired
                />
              </div>
              <div className="mb-3">
                <label className="text-neutral-800 font-medium text-sm dark:text-neutral-300">
                  Chuyên mục
                  <span style={{ color: 'red' }}>*</span>:
                </label>
                <select
                  className="h-11 mt-1 block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
                  defaultValue={values.category}
                >
                  {categories?.map((category) => (
                    <option key={category.categoryId} value={category}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                {/* <MultiSelect
                  singleSelect={true}
                  displayValue="categoryName"
                  key="categoryId"
                  showArrow={false}
                  placeholder="Chọn chuyên mục..."
                  selectedValues={values.category ? [values.category] : [null]}
                  options={categories}
                  onSelect={(selectedList) => {
                    setFieldValue('category', selectedList[0])
                  }}
                /> */}
                {errors.category && (
                  <div className="invalid-feedback block">
                    {errors.category}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="text-neutral-800 font-medium text-sm dark:text-neutral-300">
                  Thẻ<span style={{ color: 'red' }}>*</span>:
                </label>
                <MultiSelect
                  showCheckbox
                  displayValue="tagName"
                  placeholder="Chọn thẻ bài viết..."
                  selectedValues={values.tagModels}
                  options={tags}
                  onSelect={(selectedList) => {
                    setFieldValue('tagModels', selectedList)
                  }}
                  onRemove={(selectedList) => {
                    setFieldValue('tagModels', selectedList)
                  }}
                  onBlur={() => {
                    setFieldTouched('tagModels', true)
                    if (!values.tagModels) {
                      setFieldError(
                        'tagModels',
                        'Vui lòng chọn thẻ sẽ hiển thị bài viết.'
                      )
                    }
                  }}
                />
                {errors.tagModels && (
                  <div className="invalid-feedback block">
                    {errors.tagModels}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-10">
              <div className="mb-3">
                <label className="block md:col-span-2">
                  <span className="text-neutral-800 font-medium text-sm dark:text-neutral-300">
                    {' '}
                    Tóm tắt bài viết:
                  </span>
                  <textarea
                    className="block w-full text-sm rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 mt-1"
                    name="summary"
                    rows={5}
                    placeholder="Nhập tóm tắt bài viết..."
                    value={values.summary}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-3 flex flex-col items-center jusitfy-between">
                <InputField
                  type="file"
                  accept="image/*"
                  name="thumbnail"
                  label="Thumbnail"
                  onChange={(e) => {
                    handleUploadThumbnail(e, setFieldValue)
                  }}
                />
                <img
                  className="w-full h-full object-cover p-5"
                  alt="Thumbnail"
                  src={thumbnail}
                />
              </div>
              </div>
              <div className="mb-3">
                <InputField
                  label="Nội dung"
                  value={values.content}
                  customInputElement={
                    <div>
                      <QuillEditor
                        content={values.content}
                        onChange={(content) => {
                          setFieldValue('content', content)
                        }}
                        onBlur={() => {
                          setFieldTouched('content', true)
                          if (!values.content) {
                            setFieldError(
                              'content',
                              'Vui lòng nhập nội dung bài viết'
                            )
                          }
                        }}
                      />
                      {errors.content && (
                        <div className="invalid-feedback d-block">
                          {errors.content}
                        </div>
                      )}
                    </div>
                  }
                  isRequired
                />
              </div>
              <div className="mb-3">
                <InputField
                  type="datetime-local"
                  name="publishedAt"
                  label="Thời gian công bố"
                  value={values.publishedAt}
                  feedback={errors.publishedAt}
                  note={formatDate(values.publishedAt)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.publishedAt && errors.publishedAt}
                  isRequired
                />
              </div>
              <div
                className="mb-3"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setFieldValue('isPublished', !values.isPublished)
                }
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  name="isPublished"
                  checked={!values.isPublished}
                />
                <label className="text-neutral-800 font-medium text-sm dark:text-neutral-300">
                  Ẩn bài viết
                </label>
              </div>
              <div style={{ marginBottom: '4rem' }} />
              <ModalFooter className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
                <button
                  className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                  disabled={!(dirty && isValid)}
                  type="submit"
                >
                  {post?.postId ? "Cập nhật" : "Đăng"}
                  {isSubmitting && '...'}
                </button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  )
}

SubmitPost.propTypes = {}

export default SubmitPost
