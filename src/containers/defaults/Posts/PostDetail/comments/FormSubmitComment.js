import { Formik } from "formik"
import { useDispatch } from "react-redux"
import { Form } from "reactstrap"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"
import { addComment, updateComment } from "~/store/comments/actions"

export default function FormSubmitComment({
  postId,
  parentComment,
  comment,
  cancelComment,
}) {
  const dispatch = useDispatch()

  const initialValues = comment || {
    postId,
    parentId: parentComment?.id || null,
    commentText: "",
  }
  const validationSchema = Yup.object().shape({
    commentText: Yup.string().required("Nội dung không được bỏ trống"),
  })
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    if (comment?.id) {
      dispatch(updateComment(values))
    } else {
      dispatch(addComment(values))
    }
    cancelComment()
    actions.setSubmitting(false)
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        dirty,
        isValid,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form
          className='mt-5 animate__animated animate__slideInUp animate__faster'
          onSubmit={handleSubmit}
        >
          <InputField
            type='textarea'
            name='commentText'
            rows={4}
            placeholder={
              parentComment
                ? `Trả lời bình luận của ${parentComment.user?.fullName}`
                : "Thêm bình luận"
            }
            value={values.commentText}
            feedback={errors.commentText}
            onChange={handleChange}
            onBlur={handleBlur}
            invalid={values.commentText === ""}
            isRequired
          />
          <div className='mt-2 space-x-3'>
            <button
              className='relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
              disabled={!(dirty && isValid)}
              type='submit'
            >
              {comment?.id ? "Cập nhật" : "Gửi"}
              {isSubmitting && "..."}
            </button>
            {(parentComment || comment?.id) && (
              <button
                className='relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-6 font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                onClick={cancelComment}
              >
                Hủy
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}
