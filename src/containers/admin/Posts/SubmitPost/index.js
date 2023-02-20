/* eslint-disable jsx-a11y/alt-text */
import { Formik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Spinner,
} from 'reactstrap'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import postsApi from '~/apis/postsApi'
import { InputField } from '~/components/Customs'
import Modal from '~/components/Customs/Modal'
import MultiSelect from '~/components/Customs/MultiSelect'
import { addPostToList, updatePostList } from '~/store/posts/actions'
import defaultThumbnail from '~/utils/constants/defaultThumbnail'
import './index.scss'
import QuillEditor from './QuillEditor'

function SubmitPost({ visible, setVisible, post }) {
    const dispatch = useDispatch()

    const [tagList, setTagList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [thumbnail, setThumbnail] = useState(
        'data:image/jpeg;base64, ' + defaultThumbnail
    )

    useEffect(() => {
        postsApi.getAllCategory().then((response) => {
            setCategoryList(response.data.data.categories)
        })
        postsApi.getAllTag().then((response) => {
            setTagList(response.data.data)
        })
        if (post?.postId) {
            setThumbnail('data:image/jpeg;base64, ' + post.thumbnail)
        }
    }, [])

    const handleUploadThumbnail = (event, setFieldValue) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setFieldValue('thumbnail', file)
            setThumbnail(reader.result)
        }
    }

    const addedDate = (originalDate) => {
        return moment(originalDate)
            .add(7, 'hours')
            .format('YYYY-MM-DDTHH:mm:ss')
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
            .min(32, 'Tiêu đề bài viết phải nhiều hơn 32 ký tự.')
            .max(256, 'Tiêu đề bài viết phải ít hơn 256 ký tự.'),
        content: Yup.string()
            .required('Vui lòng nhập nội dung bài viết.')
            .min(512, 'Nội dung bài viết phải nhiều hơn 512 ký tự.'),
        summary: Yup.string(),
        publishedAt: Yup.string().required(),
        category: Yup.object().shape({
            categoryId: Yup.string().required(
                'Vui lòng chọn chuyên mục của bài viết.'
            ),
            categoryName: Yup.string().required(
                'Vui lòng chọn chuyên mục của bài viết.'
            ),
        }),
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
        if (post?.postId) {
            if (post?.thumbnail !== thumbnail) {
                console.log(values.thumbnail)
                const formData = new FormData()
                formData.append('image', values.thumbnail)
                const nameThumbnail = await postsApi
                    .uploadImages(formData)
                    .then((response) => {
                        return response.data.data.name
                    })
                const data = {
                    ...values,
                    thumbnail: nameThumbnail,
                    tagIds: values.tagModels.map((tag) => tag.tagId),
                    category: values.category.categoryId,
                }
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
                const data = {
                    ...values,
                    tagIds: values.tagModels.map((tag) => tag.tagId),
                    category: values.category.categoryId,
                }
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
            }
        } else {
            const formData = new FormData()
            formData.append('image', values.thumbnail)
            console.log(values.thumbnail)
            const nameThumbnail = await postsApi
                .uploadImaaaaaaaaaaaaaaaaaâges(formData)
                .then((response) => {
                    return response.data.data.name
                })
            const data = {
                ...values,
                thumbnail: nameThumbnail,
                tagIds: values.tagModels.map((tag) => tag.tagId),
                category: values.category.categoryId,
            }
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
        setVisible()
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
            <ModalHeader toggle={setVisible}>
                {post?.postId ? 'Chỉnh sửa bài viết' : 'Đăng bài viết'}
            </ModalHeader>
            <ModalBody>
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
                        setTouched,
                        isValid,
                        dirty,
                        isSubmitting,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <InputField
                                type="text"
                                name="title"
                                placeholder="Nhập tiêu đề bài viết..."
                                label="Tiêu đề"
                                inputClassName={
                                    touched.title &&
                                    errors.title &&
                                    'is-invalid'
                                }
                                showLengthValue
                                value={values.title}
                                feedback={errors.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                invalid={touched.title && errors.title}
                                isRequired
                            />
                            <div className="mb-3">
                                <Label>
                                    Chuyên mục
                                    <span style={{ color: 'red' }}>*</span>:
                                </Label>
                                <MultiSelect
                                    singleSelect={true}
                                    displayValue="categoryName"
                                    key="categoryId"
                                    showArrow={false}
                                    placeholder="Chọn chuyên mục..."
                                    selectedValues={
                                        values.category
                                            ? [values.category]
                                            : [null]
                                    }
                                    options={categoryList}
                                    onSelect={(selectedList) => {
                                        setFieldValue(
                                            'category',
                                            selectedList[0]
                                        )
                                    }}
                                />
                                {errors.category && (
                                    <div className="invalid-feedback d-block">
                                        {errors.category}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <Label>
                                    Thẻ<span style={{ color: 'red' }}>*</span>:
                                </Label>
                                <MultiSelect
                                    showCheckbox
                                    displayValue="tagName"
                                    placeholder="Chọn thẻ bài viết..."
                                    selectedValues={values.tagModels}
                                    options={tagList}
                                    onSelect={(selectedList) => {
                                        setFieldValue('tagModels', selectedList)
                                    }}
                                    onRemove={(selectedList) => {
                                        setFieldValue('tagModels', selectedList)
                                    }}
                                    onBlur={() => setTouched('tagModels', true)}
                                />
                                {errors.tagModels && (
                                    <div className="invalid-feedback d-block">
                                        {errors.tagModels}
                                    </div>
                                )}
                            </div>
                            <InputField
                                type="textarea"
                                name="summary"
                                rows="5"
                                placeholder="Nhập tóm tắt bài viết..."
                                label="Tóm tắt"
                                value={values.summary}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Nội dung"
                                value={values.content}
                                customInputElement={
                                    <div>
                                        <QuillEditor
                                            content={values.content}
                                            onChange={(content) => {
                                                setFieldValue(
                                                    'content',
                                                    content
                                                )
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
                            <div className="d-flex gap-5">
                                <div className="col-md col-12">
                                    <InputField
                                        type="file"
                                        accept="image/*"
                                        name="thumbnail"
                                        label="Thumbnail"
                                        feedback={errors.thumbnail}
                                        onChange={(e) => {
                                            handleUploadThumbnail(
                                                e,
                                                setFieldValue
                                            )
                                        }}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.thumbnail &&
                                            errors.thumbnail
                                        }
                                    />
                                    <InputField
                                        type="datetime-local"
                                        name="publishedAt"
                                        label="Thời gian công bố"
                                        value={addedDate(values.publishedAt)}
                                        feedback={errors.publishedAt}
                                        note={formatDate(values.publishedAt)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.publishedAt &&
                                            errors.publishedAt
                                        }
                                        isRequired
                                    />
                                    <div
                                        className="mb-3"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            setFieldValue(
                                                'isPublished',
                                                !values.isPublished
                                            )
                                        }
                                    >
                                        <FormGroup switch>
                                            <Input
                                                type="switch"
                                                name="isPublished"
                                                checked={!values.isPublished}
                                            />
                                            <Label check>Ẩn bài viết</Label>
                                        </FormGroup>
                                    </div>
                                </div>
                                <img
                                    className="col-md-4 col-12 order-md-2 order-1"
                                    alt="No thumbnail"
                                    style={{ height: '200px', width: '200px' }}
                                    src={
                                        // 'data:image/jpeg;base64,' +
                                        thumbnail
                                    }
                                />
                            </div>
                            <div style={{ marginBottom: '4rem' }} />
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    // disabled={!(dirty && isValid)}
                                    className="fw-bolder"
                                    type="submit"
                                >
                                    {post?.postId
                                        ? 'Cập nhật'
                                        : 'Đăng bài viết'}
                                    {isSubmitting && (
                                        <Spinner
                                            color="white"
                                            size="sm"
                                            className="ms-2"
                                        >
                                            Loading...
                                        </Spinner>
                                    )}
                                </Button>
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
