/* eslint-disable jsx-a11y/alt-text */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import postsApi from '~/apis/postsApi'
import { Button, InputField } from '~/components/Customs'
import Modal from '~/components/Customs/Modal'
import MultiSelect from '~/components/Customs/MultiSelect'
import { addPostToList, updatePostList } from '~/store/posts/actions'
import { postsSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import { env } from '~/utils/constants/env'
import styles from './index.module.scss'
import {
    default as QuillEditor,
    default as RichTextEditor,
} from './QuillEditor'

const cx = bindClassNames(styles)

function SubmitPost({ visible, setVisible, post }) {
    const status = useSelector(postsSelector).status
    const dispatch = useDispatch()

    const [tagList, setTagList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        postsApi.getAllCategory().then((response) => {
            setCategoryList(response.data.data.categories)
        })
        postsApi.getAllTag().then((response) => {
            setTagList(response.data.data)
        })
    }, [])

    const handleUploadThumbnail = (event, setFieldValue) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            const base64 = reader.result.split(',')[1]
            setFieldValue('thumbnail', base64)
        }
    }

    let initialValues = {
        title: '',
        content: '',
        summary: '',
        isPublished: true,
        publishAt: new Date().toISOString().slice(0, 16),
        category: {},
        tagModels: [],
        thumbnail: '',
    }
    if (post?.postId) {
        initialValues = {
            ...initialValues,
            ...post,
        }
    }
    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Vui lòng nhập tiêu đề bài viết.')
            .min(32, 'Tiêu đề bài viết phải nhiều hơn 32 ký tự.')
            .max(256, 'Tiêu đề bài viết phải ít hơn 256 ký tự.'),
        content: Yup.string()
            .required('Vui lòng nhập nội dung bài viết.')
            .min(512, 'Nội dung bài viết phải nhiều hơn 512 ký tự.'),
        summary: Yup.string()
            .required('Vui lòng nhập tóm tắt bài viết')
            .min(50, 'Tóm tắt bài viết phải nhiều hơn 50 ký tự.')
            .max(200, 'Tóm tắt bài viết phải ít hơn 200 ký tự.'),
        publishAt: Yup.string()
            .required('Vui lòng chọn thời gian công bố bài viết.')
            .test(
                'publishAt',
                'Thời gian công bố bài viết không hợp lệ.',
                function (publishAt) {
                    return new Date().getTime() < new Date(publishAt).getTime()
                }
            ),
        category: Yup.object({
            categoryId: Yup.number().required(
                'Vui lòng chọn thể loại bài viết.'
            ),
        }),
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
            postsApi.updatePost(values).then((response) => {
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
            postsApi.addPost(values).then((response) => {
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
                        isValid,
                        dirty,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <InputField
                                type="text"
                                name="title"
                                placeholder="Nhập tiêu đề bài viết..."
                                label="Tiêu đề"
                                inputClassName={cx({
                                    'is-invalid': touched.title && errors.title,
                                })}
                                value={values.title}
                                feedback={errors.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                invalid={touched.title && errors.title}
                                isRequired
                            />
                            <InputField
                                label="Thể loại"
                                isRequired
                                invalid={touched.category && errors.category}
                                feedback={errors.category}
                                customInputElement={
                                    <MultiSelect
                                        singleSelect
                                        displayValue="categoryName"
                                        placeholder="Chọn thể loại bài viết..."
                                        // selectedValues={type === "proposal-type" ? info?.proposalConfigTargets : info?.approvalConfigTargets}
                                        options={categoryList}
                                        onSelect={(selectedItem) => {
                                            console.log(values.content)
                                            setFieldValue(
                                                'category',
                                                selectedItem
                                            )
                                        }}
                                        onRemove={(selectedItem) => {
                                            setFieldValue(
                                                'category',
                                                selectedItem
                                            )
                                        }}
                                    />
                                }
                            />
                            <InputField
                                label="Thẻ"
                                isRequired
                                invalid={touched.tagModels && errors.tagModels}
                                feedback={errors.tagModels}
                                customInputElement={
                                    <MultiSelect
                                        showCheckbox
                                        displayValue="tagName"
                                        placeholder="Chọn thẻ bài viết..."
                                        // selectedValues={type === "proposal-type" ? info?.proposalConfigTargets : info?.approvalConfigTargets}
                                        options={tagList}
                                        onSelect={(selectedList) => {
                                            setFieldValue(
                                                'tagModels',
                                                selectedList
                                            )
                                        }}
                                        onRemove={(selectedList) => {
                                            setFieldValue(
                                                'tagModels',
                                                selectedList
                                            )
                                        }}
                                    />
                                }
                            />
                            <InputField
                                type="textarea"
                                name="summary"
                                rows="5"
                                placeholder="Nhập tóm tắt bài viết..."
                                label="Tóm tắt"
                                inputClassName={cx({
                                    'is-invalid':
                                        touched.summary && errors.summary,
                                })}
                                value={values.summary}
                                feedback={errors.summary}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                invalid={touched.summary && errors.summary}
                                isRequired
                            />
                            <InputField
                                type="text"
                                name="content"
                                label="Nội dung"
                                inputClassName={cx({
                                    'is-invalid':
                                        touched.content && errors.content,
                                })}
                                feedback="Vui lòng nhập nội dung bài viết."
                                customInputElement={
                                    <QuillEditor
                                        content={values.content}
                                        handleEditorChange={(newContent) =>
                                            setFieldValue('content', newContent)
                                        }
                                    />
                                }
                                isRequired
                            />
                            <div className="d-flex gap-5">
                                <div className="col">
                                    <InputField
                                        type="file"
                                        accept="image/*"
                                        name="thumbnail"
                                        label="Thumbnail"
                                        inputClassName={cx({
                                            'is-invalid':
                                                touched.thumbnail &&
                                                errors.thumbnail,
                                        })}
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
                                        name="publishAt"
                                        min={new Date()
                                            .toISOString()
                                            .slice(0, 16)}
                                        label="Thời gian công bố"
                                        inputClassName={cx({
                                            'is-invalid':
                                                touched.publishAt &&
                                                errors.publishAt,
                                        })}
                                        value={values.publishAt}
                                        feedback={errors.publishAt}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={
                                            touched.publishAt &&
                                            errors.publishAt
                                        }
                                        isRequired
                                    />
                                </div>
                                <img
                                    className="col-4"
                                    style={{ height: '200px', width: '200px' }}
                                    src={
                                        'data:image/jpeg;base64,' +
                                        values.thumbnail
                                    }
                                />
                            </div>
                            <div style={{ marginBottom: '4rem' }} />
                            <ModalFooter>
                                <Button
                                    disabled={!(dirty && isValid)}
                                    variant="active"
                                    className="fw-bolder"
                                    type="submit"
                                >
                                    {post?.postId
                                        ? 'Cập nhật'
                                        : 'Đăng bài viết'}
                                    {status === 'isSubmitting' && (
                                        <div className="d-inline text-center ms-3">
                                            <div className="spinner-border"></div>
                                        </div>
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
