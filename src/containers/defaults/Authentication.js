/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from "formik"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"
import Motion from "~/components/Motion"
import SeoHelmet from "~/components/SeoHelmet"
import { auth } from "~/store/auth/actions"
import { authSelector } from "~/store/selectors"
import { path } from "~/utils"

export default function Authentication() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(authSelector).status
  const userInfo = useSelector(authSelector).userInfo

  useEffect(() => {
    if (status === "user") {
      if (!userInfo?.admin) {
        navigate("/")
      } else {
        navigate(`${path.ADMIN + path.ADMIN_HOME}`)
      }
    }
  }, [])

  /* Xử lý form */
  const initialValues = {
    citizenId: "",
    phoneNumber: "",
    dob: "",
  }
  const validationSchema = Yup.object({
    citizenId: Yup.string().required("Vui lòng nhập số CNMD/CCCD"),
    phoneNumber: Yup.string()
      .matches(/^(03|05|07|08|09)+([0-9]{8})\b/, "Số điện thoại không hợp lệ")
      .required("Vui lòng nhập số điện thoại"),
    dob: Yup.string().required("Vui lòng nhập ngày sinh"),
  })
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    console.log(JSON.stringify(values))
    await dispatch(auth(values))
    actions.setSubmitting(false)
  }
  //
  return (
    <Motion>
      <SeoHelmet title='Xác thực đăng nhập với Google' />
      <div className='relative'>
        <div
          className='absolute h-[400px] top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40'
          // src={defaultThumbnail}
          // alt="Ký Túc Xá Cỏ May"
        />
        <div className='container relative pt-10 pb-16 lg:pt-20 lg:pb-28'>
          <div className='p-5 mx-auto bg-white rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'>
            <header className='text-center max-w-2xl mx-auto'>
              <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                XÁC THỰC ĐĂNG NHẬP VỚI GOOGLE
              </h2>
              <span className='block text-sm text-neutral-700 sm:text-base dark:text-neutral-200'>
                Vui lòng nhập các thông tin dưới đây để xác thực cho tài khoản
                của bạn
              </span>
            </header>
            <div className='max-w-md mx-auto space-y-6 mt-10 mb-10'>
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
                  isValid,
                  dirty,
                  isSubmitting,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    className='grid grid-cols-1 gap-6'
                  >
                    <InputField
                      type='text'
                      name='citizenId'
                      placeholder='Nhập số CNMD/CCCD...'
                      label='Số CMND/CCCD'
                      invalid={touched.citizenId && errors.citizenId}
                      value={values.citizenId}
                      feedback={errors.citizenId}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isRequired
                    />
                    <InputField
                      type='text'
                      name='phoneNumber'
                      placeholder='Nhập số điện thoại...'
                      label='Số điện thoại'
                      invalid={touched.phoneNumber && errors.phoneNumber}
                      value={values.phoneNumber}
                      feedback={errors.phoneNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isRequired
                    />
                    <InputField
                      type='date'
                      name='dob'
                      label='Ngày sinh'
                      invalid={touched.dob && errors.dob}
                      value={values.dob}
                      feedback={errors.dob}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isRequired
                    />
                    <button
                      type='submit'
                      className='relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                    >
                      Xác nhận
                      {isSubmitting && "..."}
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  )
}
